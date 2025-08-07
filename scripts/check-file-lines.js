/* eslint-disable @typescript-eslint/no-require-imports */

const { readFileSync } = require("fs");
const path = require("path");

const { glob } = require("glob");
const pino = require("pino");

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      ignore: "pid,hostname",
      translateTime: "SYS:standard",
    },
  },
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

const CONFIG = {
  maxLines: 350,
  skipBlankLines: true,
  skipComments: true,
  includePatterns: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
  excludePatterns: [
    "node_modules/**",
    ".next/**",
    "dist/**",
    "build/**",
    "coverage/**",
    "**/*.config.js",
    "**/*.config.ts",
    "**/*.config.mjs",
    "**/components/ui/**/*",
    "**/*.d.ts",
    "**/*.json",
    ".husky/**",
    ".git/**",
    "scripts/**", // Exclude scripts directory
    "**/tests/**",
    "**/playwright/**"
  ],
};

/**
 * Count lines in a file with various filtering options
 * @param {string} filePath - Path to the file
 * @param {object} config - Configuration object
 * @returns {object} Line count information
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function countLines(filePath, config) {
  try {
    const content = readFileSync(filePath, "utf8");
    const lines = content.split("\n");

    let nonEmpty = 0;
    let nonCommentNonEmpty = 0;

    for (const line of lines) {
      const trimmed = line.trim();

      // Count non-empty lines
      if (trimmed.length > 0) {
        nonEmpty++;

        // Count non-comment, non-empty lines
        if (!isCommentLine(trimmed)) {
          nonCommentNonEmpty++;
        }
      }
    }

    return {
      total: lines.length,
      nonEmpty,
      nonCommentNonEmpty,
    };
  } catch (error) {
    logger.error({ filePath, error: error.message }, "Failed to read file");
    return { total: 0, nonEmpty: 0, nonCommentNonEmpty: 0 };
  }
}

/**
 * Check if a line is a comment
 * @param {string} trimmedLine - Trimmed line content
 * @returns {boolean} True if the line is a comment
 */
function isCommentLine(trimmedLine) {
  return (
    trimmedLine.startsWith("//") ||
    trimmedLine.startsWith("/*") ||
    trimmedLine.startsWith("*") ||
    trimmedLine === "*/" ||
    trimmedLine.startsWith("#") // For scripts and configs
  );
}

/**
 * Get the effective line count based on configuration
 * @param {object} lineCount - Line count object
 * @param {object} config - Configuration object
 * @returns {number} Effective line count
 */
function getEffectiveLineCount(lineCount, config) {
  if (config.skipComments && config.skipBlankLines) {
    return lineCount.nonCommentNonEmpty;
  } else if (config.skipBlankLines) {
    return lineCount.nonEmpty;
  } else {
    return lineCount.total;
  }
}

/**
 * Main function to check all files
 */
async function checkFiles() {
  logger.info({ config: CONFIG }, "Starting file line limit check");

  try {
    const files = await glob(CONFIG.includePatterns, {
      ignore: CONFIG.excludePatterns,
      absolute: true,
    });

    logger.info({ fileCount: files.length }, "Found files to check");

    const violations = [];

    for (const file of files) {
      const relativePath = path.relative(process.cwd(), file);
      const lineCount = countLines(file, CONFIG);
      const effectiveLines = getEffectiveLineCount(lineCount, CONFIG);

      logger.debug(
        {
          file: relativePath,
          lineCount,
          effectiveLines,
        },
        "Checked file"
      );

      if (effectiveLines > CONFIG.maxLines) {
        violations.push({
          file: relativePath,
          lines: effectiveLines,
          totalLines: lineCount.total,
          limit: CONFIG.maxLines,
        });
      }
    }

    if (violations.length > 0) {
      logger.error(
        { violationCount: violations.length },
        "Files exceeding line limit found"
      );

      for (const violation of violations) {
        logger.error(
          {
            file: violation.file,
            lines: violation.lines,
            totalLines: violation.totalLines,
            limit: violation.limit,
            excess: violation.lines - violation.limit,
          },
          "File exceeds line limit"
        );
      }

      logger.error(
        "Please refactor these files to reduce their size. Consider breaking them into smaller, more focused modules."
      );

      process.exit(1);
    }

    logger.info(
      {
        checkedFiles: files.length,
        limit: CONFIG.maxLines,
      },
      "All files are within the line limit"
    );
  } catch (error) {
    logger.error({ error: error.message }, "Error during file checking");
    process.exit(1);
  }
}

// Handle process signals gracefully
process.on("SIGINT", () => {
  logger.info("Received SIGINT, exiting gracefully");
  process.exit(0);
});

process.on("SIGTERM", () => {
  logger.info("Received SIGTERM, exiting gracefully");
  process.exit(0);
});

// Run the check
if (require.main === module) {
  checkFiles().catch((error) => {
    logger.fatal({ error: error.message }, "Unexpected error occurred");
    process.exit(1);
  });
}
