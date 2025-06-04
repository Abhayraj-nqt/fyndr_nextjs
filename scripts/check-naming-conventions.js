/* eslint-disable @typescript-eslint/no-require-imports */

const { statSync } = require('fs');
const path = require('path');

const { glob } = require('glob');
const pino = require('pino');

// Create a logger specifically for this script
const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            ignore: 'pid,hostname',
            translateTime: 'SYS:standard',
        },
    },
    formatters: {
        level: (label) => ({ level: label.toUpperCase() }),
    },
    timestamp: pino.stdTimeFunctions.isoTime,
});

const CONFIG = {
    // Directories to check
    includePatterns: [
        'src/**',
        'pages/**',
        'components/**',
        'lib/**',
        'utils/**',
        'types/**',
        'styles/**',
        'public/**',
        'app/**', // For Next.js 13+ app directory
    ],
    // Patterns to exclude
    excludePatterns: [
        'node_modules/**',
        '.next/**',
        'dist/**',
        'build/**',
        'coverage/**',
        '.git/**',
        '.husky/**',
        'scripts/**',
    ],
    // Files that are allowed to break kebab-case rules
    allowedExceptions: [
        // React component files (PascalCase)
        /^[A-Z][a-zA-Z0-9]*\.(tsx?|jsx?)$/,
        // React hooks (starting with 'use')
        /^use[A-Z][a-zA-Z0-9]*\.(tsx?|jsx?)$/,
        // Next.js special files
        /^_app\.(tsx?|jsx?)$/,
        /^_document\.(tsx?|jsx?)$/,
        /^_error\.(tsx?|jsx?)$/,
        /^404\.(tsx?|jsx?)$/,
        /^500\.(tsx?|jsx?)$/,
        /^layout\.(tsx?|jsx?)$/,
        /^loading\.(tsx?|jsx?)$/,
        /^not-found\.(tsx?|jsx?)$/,
        /^error\.(tsx?|jsx?)$/,
        /^page\.(tsx?|jsx?)$/,
        /^template\.(tsx?|jsx?)$/,
        /^default\.(tsx?|jsx?)$/,
        /^global-error\.(tsx?|jsx?)$/,
        /^opengraph-image\.(tsx?|jsx?|jpg|jpeg|png|gif)$/,
        /^twitter-image\.(tsx?|jsx?|jpg|jpeg|png|gif)$/,
        /^icon\.(tsx?|jsx?|jpg|jpeg|png|gif|svg|ico)$/,
        /^apple-icon\.(tsx?|jsx?|jpg|jpeg|png|gif)$/,
        /^favicon\.ico$/,
        /^sitemap\.(xml|tsx?|jsx?)$/,
        /^robots\.txt$/,
        /^manifest\.(json|tsx?|jsx?)$/,
        /^route\.(tsx?|jsx?)$/,
        // Config files
        /\.config\.(js|ts|mjs|json)$/,
        // Declaration files
        /\.d\.ts$/,
        // Common files
        /^README/i,
        /^CHANGELOG/i,
        /^LICENSE/i,
        /^Dockerfile$/,
        /^next-env\.d\.ts$/,
        // Environment files
        /^\.env/,
        // Middleware
        /^middleware\.(tsx?|jsx?)$/,
        // Instrumentation
        /^instrumentation\.(tsx?|jsx?)$/,
    ],
    // Directories that are allowed to break kebab-case rules
    allowedDirectoryExceptions: [
        // PascalCase directories (for component folders)
        /^[A-Z][a-zA-Z0-9]*$/,
        // Next.js private folders (starting with underscore)
        /^_[a-zA-Z0-9_-]*$/,
        // Next.js dynamic routes
        /^\[.*\]$/,
        // Next.js route groups
        /^\(.*\)$/,
        // Next.js parallel routes
        /^@[a-zA-Z0-9_-]*$/,
        // Next.js intercepting routes
        /^\(\.+\)/,
        // Common directories
        /^api$/,
        /^public$/,
        /^static$/,
        /^assets$/,
        /^images$/,
        /^fonts$/,
        /^icons$/,
        /^styles$/,
        /^css$/,
        /^scss$/,
        /^sass$/,
        /^less$/,
        // Test directories
        /^__tests__$/,
        /^__mocks__$/,
        /^test$/,
        /^tests$/,
        /^spec$/,
        /^specs$/,
        // Build directories
        /^dist$/,
        /^build$/,
        /^out$/,
        // Node.js
        /^node_modules$/,
    ],
};

/**
 * Check if a name follows kebab-case convention
 * @param {string} name - The name to check
 * @returns {boolean} True if kebab-case
 */
function isKebabCase(name) {
    // Remove file extension for checking
    const nameWithoutExt = name.split('.')[0];

    // Kebab-case pattern: lowercase letters, numbers, and hyphens only
    // Must start with a letter, can't have consecutive hyphens or end with hyphen
    const kebabCasePattern = /^[a-z]([a-z0-9]*(-[a-z0-9]+)*)?$/;

    return kebabCasePattern.test(nameWithoutExt);
}

/**
 * Check if a file/directory is allowed to break naming rules
 * @param {string} name - The name to check
 * @param {string} fullPath - Full path for context
 * @param {boolean} isDirectory - Whether it's a directory
 * @returns {boolean} True if allowed exception
 */
function isAllowedException(name, fullPath, isDirectory = false) {
    const exceptions = isDirectory
        ? CONFIG.allowedDirectoryExceptions
        : CONFIG.allowedExceptions;

    // Check if the path contains Next.js special directories
    const pathParts = fullPath.split(path.sep);
    const hasNextJsPrivateFolder = pathParts.some(part => part.startsWith('_'));
    const hasRouteGroup = pathParts.some(part => /^\(.*\)$/.test(part));
    const hasDynamicRoute = pathParts.some(part => /^\[.*\]$/.test(part));
    const hasParallelRoute = pathParts.some(part => part.startsWith('@'));
    const hasInterceptingRoute = pathParts.some(part => /^\(\.+\)/.test(part));

    // If we're inside any Next.js special directory structure, be more lenient
    if (hasNextJsPrivateFolder || hasRouteGroup || hasDynamicRoute || hasParallelRoute || hasInterceptingRoute) {
        // Allow common folder names in Next.js contexts
        if (isDirectory && (
            name === 'components' ||
            name === 'utils' ||
            name === 'hooks' ||
            name === 'types' ||
            name === 'constants' ||
            name === 'helpers' ||
            name === 'lib' ||
            name === 'styles' ||
            name === 'assets'
        )) {
            return true;
        }
    }

    return exceptions.some(pattern => {
        if (pattern instanceof RegExp) {
            return pattern.test(name) || pattern.test(fullPath);
        }
        return name === pattern || fullPath.includes(pattern);
    });
}

/**
 * Get all files and directories to check
 * @returns {Promise<Array>} Array of file/directory paths
 */
async function getFilesAndDirectories() {
    const allPaths = [];

    for (const pattern of CONFIG.includePatterns) {
        try {
            const files = await glob(pattern, {
                ignore: CONFIG.excludePatterns,
                absolute: true,
                includeDirectories: true, // This will include directories too
            });
            allPaths.push(...files);
        } catch (error) {
            logger.warn({ pattern, error: error.message }, 'Failed to glob pattern');
        }
    }

    // Also check directories manually since glob might miss some
    const directories = await glob(CONFIG.includePatterns.map(p => p + '/'), {
        ignore: CONFIG.excludePatterns,
        absolute: true,
    });

    allPaths.push(...directories);

    return [...new Set(allPaths)]; // Remove duplicates
}

/**
 * Check naming conventions for all files and directories
 */
async function checkNamingConventions() {
    logger.info('Starting naming convention check (kebab-case)');

    try {
        const paths = await getFilesAndDirectories();
        const violations = [];

        logger.info({ pathCount: paths.length }, 'Found paths to check');

        for (const fullPath of paths) {
            const relativePath = path.relative(process.cwd(), fullPath);
            const name = path.basename(fullPath);

            let isDirectory = false;
            try {
                isDirectory = statSync(fullPath).isDirectory();
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                continue;
            }

            logger.debug({
                path: relativePath,
                name,
                isDirectory
            }, 'Checking path');

            // Skip if it's an allowed exception
            if (isAllowedException(name, relativePath, isDirectory)) {
                logger.debug({ name, path: relativePath }, 'Skipping allowed exception');
                continue;
            }

            // Check if name follows kebab-case
            if (!isKebabCase(name)) {
                violations.push({
                    path: relativePath,
                    name,
                    type: isDirectory ? 'directory' : 'file',
                    suggestion: suggestKebabCase(name),
                });
            }
        }

        if (violations.length > 0) {
            logger.error({ violationCount: violations.length }, 'Naming convention violations found');

            // Group violations by type
            const fileViolations = violations.filter(v => v.type === 'file');
            const dirViolations = violations.filter(v => v.type === 'directory');

            if (fileViolations.length > 0) {
                logger.error('Files not following kebab-case:');
                fileViolations.forEach(violation => {
                    logger.error({
                        file: violation.path,
                        current: violation.name,
                        suggested: violation.suggestion,
                    }, 'File naming violation');
                });
            }

            if (dirViolations.length > 0) {
                logger.error('Directories not following kebab-case:');
                dirViolations.forEach(violation => {
                    logger.error({
                        directory: violation.path,
                        current: violation.name,
                        suggested: violation.suggestion,
                    }, 'Directory naming violation');
                });
            }

            logger.error('Please rename these files/directories to follow kebab-case convention (lowercase-with-hyphens).');
            logger.error('Examples: UserProfile.tsx → user-profile.tsx, myUtils → my-utils');

            process.exit(1);
        }

        logger.info({
            checkedPaths: paths.length
        }, 'All files and directories follow kebab-case naming convention');

    } catch (error) {
        logger.error({ error: error.message }, 'Error during naming convention check');
        process.exit(1);
    }
}

/**
 * Suggest a kebab-case version of a name
 * @param {string} name - Original name
 * @returns {string} Suggested kebab-case name
 */
function suggestKebabCase(name) {
    const parts = name.split('.');
    const nameWithoutExt = parts[0];
    const extension = parts.slice(1).join('.');

    // Convert to kebab-case
    const kebabCaseName = nameWithoutExt
        // Insert hyphens before uppercase letters
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        // Replace underscores with hyphens
        .replace(/_/g, '-')
        // Convert to lowercase
        .toLowerCase()
        // Remove multiple consecutive hyphens
        .replace(/-+/g, '-')
        // Remove leading/trailing hyphens
        .replace(/^-|-$/g, '');

    return extension ? `${kebabCaseName}.${extension}` : kebabCaseName;
}

// Handle process signals gracefully
process.on('SIGINT', () => {
    logger.info('Received SIGINT, exiting gracefully');
    process.exit(0);
});

process.on('SIGTERM', () => {
    logger.info('Received SIGTERM, exiting gracefully');
    process.exit(0);
});

// Run the check
if (require.main === module) {
    checkNamingConventions().catch((error) => {
        logger.fatal({ error: error.message }, 'Unexpected error occurred');
        process.exit(1);
    });
}