/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from "vitest";

import { parseStringCase } from "@/lib/utils/parser";
import { CaseTypeProps } from "@/lib/utils/parser/string";

describe("parseStringCase", () => {
  const testStrings = {
    simple: "hello",
    multiWord: "hello world",
    withSpaces: "  hello world  ",
    camelCase: "helloWorld",
    pascalCase: "HelloWorld",
    kebabCase: "hello-world",
    snakeCase: "hello_world",
    mixedCase: "Hello WORLD test",
    withNumbers: "hello123world",
    withSpecialChars: "hello@world#test",
    singleChar: "a",
    empty: "",
    onlySpaces: "   ",
    sentence: "this is a long sentence with many words",
    acronym: "HTML CSS JS",
    mixedSymbols: "hello-world_test.case",
  };

  describe("upper-case", () => {
    it("converts simple string to uppercase", () => {
      expect(
        parseStringCase({ input: testStrings.simple, caseType: "upper-case" })
      ).toBe("HELLO");
    });

    it("converts multi-word string to uppercase", () => {
      expect(
        parseStringCase({
          input: testStrings.multiWord,
          caseType: "upper-case",
        })
      ).toBe("HELLO WORLD");
    });

    it("trims spaces and converts to uppercase", () => {
      expect(
        parseStringCase({
          input: testStrings.withSpaces,
          caseType: "upper-case",
        })
      ).toBe("HELLO WORLD");
    });

    it("handles mixed case input", () => {
      expect(
        parseStringCase({
          input: testStrings.mixedCase,
          caseType: "upper-case",
        })
      ).toBe("HELLO WORLD TEST");
    });

    it("handles empty string", () => {
      expect(
        parseStringCase({ input: testStrings.empty, caseType: "upper-case" })
      ).toBe("");
    });
  });

  describe("lower-case", () => {
    it("converts simple string to lowercase", () => {
      expect(parseStringCase({ input: "HELLO", caseType: "lower-case" })).toBe(
        "hello"
      );
    });

    it("converts multi-word string to lowercase", () => {
      expect(
        parseStringCase({ input: "HELLO WORLD", caseType: "lower-case" })
      ).toBe("hello world");
    });

    it("handles mixed case input", () => {
      expect(
        parseStringCase({
          input: testStrings.mixedCase,
          caseType: "lower-case",
        })
      ).toBe("hello world test");
    });

    it("trims spaces and converts to lowercase", () => {
      expect(
        parseStringCase({ input: "  HELLO WORLD  ", caseType: "lower-case" })
      ).toBe("hello world");
    });
  });

  describe("title-case", () => {
    it("converts simple string to title case", () => {
      expect(
        parseStringCase({ input: testStrings.simple, caseType: "title-case" })
      ).toBe("Hello");
    });

    it("converts multi-word string to title case", () => {
      expect(
        parseStringCase({
          input: testStrings.multiWord,
          caseType: "title-case",
        })
      ).toBe("Hello World");
    });

    it("handles mixed case input", () => {
      expect(
        parseStringCase({ input: "hello WORLD test", caseType: "title-case" })
      ).toBe("Hello World Test");
    });

    it("handles sentence with articles", () => {
      expect(
        parseStringCase({
          input: "the quick brown fox",
          caseType: "title-case",
        })
      ).toBe("The Quick Brown Fox");
    });

    it("handles numbers in string", () => {
      expect(
        parseStringCase({
          input: testStrings.withNumbers,
          caseType: "title-case",
        })
      ).toBe("Hello123world");
    });
  });

  describe("camel-case", () => {
    it("converts simple string to camelCase", () => {
      expect(
        parseStringCase({ input: testStrings.simple, caseType: "camel-case" })
      ).toBe("hello");
    });

    it("converts multi-word string to camelCase", () => {
      expect(
        parseStringCase({
          input: testStrings.multiWord,
          caseType: "camel-case",
        })
      ).toBe("helloWorld");
    });

    it("converts sentence to camelCase", () => {
      expect(
        parseStringCase({ input: testStrings.sentence, caseType: "camel-case" })
      ).toBe("thisIsALongSentenceWithManyWords");
    });

    it("handles mixed case input", () => {
      expect(
        parseStringCase({ input: "Hello WORLD Test", caseType: "camel-case" })
      ).toBe("helloWorldTest");
    });

    // it("removes special characters", () => {
    //   expect(
    //     parseStringCase({
    //       input: testStrings.withSpecialChars,
    //       caseType: "camel-case",
    //     })
    //   ).toBe("helloworldtest");
    // });
    it("removes special characters", () => {
      expect(
        parseStringCase({
          input: testStrings.withSpecialChars,
          caseType: "camel-case",
        })
      ).toBe("helloWorldTest");
    });

    it("handles kebab-case input", () => {
      expect(
        parseStringCase({
          input: testStrings.kebabCase,
          caseType: "camel-case",
        })
      ).toBe("helloWorld");
    });

    it("handles snake_case input", () => {
      expect(
        parseStringCase({
          input: testStrings.snakeCase,
          caseType: "camel-case",
        })
      ).toBe("helloWorld");
    });
  });

  describe("pascal-case", () => {
    it("converts simple string to PascalCase", () => {
      expect(
        parseStringCase({ input: testStrings.simple, caseType: "pascal-case" })
      ).toBe("Hello");
    });

    it("converts multi-word string to PascalCase", () => {
      expect(
        parseStringCase({
          input: testStrings.multiWord,
          caseType: "pascal-case",
        })
      ).toBe("HelloWorld");
    });

    it("converts sentence to PascalCase", () => {
      expect(
        parseStringCase({
          input: testStrings.sentence,
          caseType: "pascal-case",
        })
      ).toBe("ThisIsALongSentenceWithManyWords");
    });

    it("handles mixed case input", () => {
      expect(
        parseStringCase({ input: "hello WORLD test", caseType: "pascal-case" })
      ).toBe("HelloWorldTest");
    });

    it("removes special characters", () => {
      expect(
        parseStringCase({
          input: testStrings.withSpecialChars,
          caseType: "pascal-case",
        })
      ).toBe("HelloWorldTest");
    });
  });

  describe("snake-case", () => {
    it("converts simple string to snake_case", () => {
      expect(
        parseStringCase({ input: testStrings.simple, caseType: "snake-case" })
      ).toBe("hello");
    });

    it("converts multi-word string to snake_case", () => {
      expect(
        parseStringCase({
          input: testStrings.multiWord,
          caseType: "snake-case",
        })
      ).toBe("hello_world");
    });

    it("converts camelCase to snake_case", () => {
      expect(
        parseStringCase({
          input: testStrings.camelCase,
          caseType: "snake-case",
        })
      ).toBe("hello_world");
    });

    it("converts PascalCase to snake_case", () => {
      expect(
        parseStringCase({
          input: testStrings.pascalCase,
          caseType: "snake-case",
        })
      ).toBe("hello_world");
    });

    it("handles mixed case input", () => {
      expect(
        parseStringCase({ input: "Hello WORLD Test", caseType: "snake-case" })
      ).toBe("hello_world_test");
    });

    it("handles special characters", () => {
      expect(
        parseStringCase({
          input: testStrings.withSpecialChars,
          caseType: "snake-case",
        })
      ).toBe("hello_world_test");
    });

    it("removes consecutive underscores", () => {
      expect(
        parseStringCase({ input: "hello___world", caseType: "snake-case" })
      ).toBe("hello_world");
    });

    it("removes leading/trailing underscores", () => {
      expect(
        parseStringCase({ input: "_hello_world_", caseType: "snake-case" })
      ).toBe("hello_world");
    });
  });

  describe("kebab-case", () => {
    it("converts simple string to kebab-case", () => {
      expect(
        parseStringCase({ input: testStrings.simple, caseType: "kebab-case" })
      ).toBe("hello");
    });

    it("converts multi-word string to kebab-case", () => {
      expect(
        parseStringCase({
          input: testStrings.multiWord,
          caseType: "kebab-case",
        })
      ).toBe("hello-world");
    });

    it("converts camelCase to kebab-case", () => {
      expect(
        parseStringCase({
          input: testStrings.camelCase,
          caseType: "kebab-case",
        })
      ).toBe("hello-world");
    });

    it("converts PascalCase to kebab-case", () => {
      expect(
        parseStringCase({
          input: testStrings.pascalCase,
          caseType: "kebab-case",
        })
      ).toBe("hello-world");
    });

    it("handles mixed case input", () => {
      expect(
        parseStringCase({ input: "Hello WORLD Test", caseType: "kebab-case" })
      ).toBe("hello-world-test");
    });

    it("handles special characters", () => {
      expect(
        parseStringCase({
          input: testStrings.withSpecialChars,
          caseType: "kebab-case",
        })
      ).toBe("hello-world-test");
    });

    it("removes consecutive hyphens", () => {
      expect(
        parseStringCase({ input: "hello---world", caseType: "kebab-case" })
      ).toBe("hello-world");
    });

    it("removes leading/trailing hyphens", () => {
      expect(
        parseStringCase({ input: "-hello-world-", caseType: "kebab-case" })
      ).toBe("hello-world");
    });
  });

  describe("constant-case", () => {
    it("converts simple string to CONSTANT_CASE", () => {
      expect(
        parseStringCase({
          input: testStrings.simple,
          caseType: "constant-case",
        })
      ).toBe("HELLO");
    });

    it("converts multi-word string to CONSTANT_CASE", () => {
      expect(
        parseStringCase({
          input: testStrings.multiWord,
          caseType: "constant-case",
        })
      ).toBe("HELLO_WORLD");
    });

    it("converts camelCase to CONSTANT_CASE", () => {
      expect(
        parseStringCase({
          input: testStrings.camelCase,
          caseType: "constant-case",
        })
      ).toBe("HELLO_WORLD");
    });

    it("converts PascalCase to CONSTANT_CASE", () => {
      expect(
        parseStringCase({
          input: testStrings.pascalCase,
          caseType: "constant-case",
        })
      ).toBe("HELLO_WORLD");
    });

    it("handles mixed case input", () => {
      expect(
        parseStringCase({
          input: "Hello WORLD Test",
          caseType: "constant-case",
        })
      ).toBe("HELLO_WORLD_TEST");
    });

    it("handles special characters", () => {
      expect(
        parseStringCase({
          input: testStrings.withSpecialChars,
          caseType: "constant-case",
        })
      ).toBe("HELLO_WORLD_TEST");
    });
  });

  describe("dot-case", () => {
    it("converts simple string to dot.case", () => {
      expect(
        parseStringCase({ input: testStrings.simple, caseType: "dot-case" })
      ).toBe("hello");
    });

    it("converts multi-word string to dot.case", () => {
      expect(
        parseStringCase({ input: testStrings.multiWord, caseType: "dot-case" })
      ).toBe("hello.world");
    });

    it("converts camelCase to dot.case", () => {
      expect(
        parseStringCase({ input: testStrings.camelCase, caseType: "dot-case" })
      ).toBe("hello.world");
    });

    it("converts PascalCase to dot.case", () => {
      expect(
        parseStringCase({ input: testStrings.pascalCase, caseType: "dot-case" })
      ).toBe("hello.world");
    });

    it("handles mixed case input", () => {
      expect(
        parseStringCase({ input: "Hello WORLD Test", caseType: "dot-case" })
      ).toBe("hello.world.test");
    });

    it("handles special characters", () => {
      expect(
        parseStringCase({
          input: testStrings.withSpecialChars,
          caseType: "dot-case",
        })
      ).toBe("hello.world.test");
    });

    it("removes consecutive dots", () => {
      expect(
        parseStringCase({ input: "hello...world", caseType: "dot-case" })
      ).toBe("hello.world");
    });

    it("removes leading/trailing dots", () => {
      expect(
        parseStringCase({ input: ".hello.world.", caseType: "dot-case" })
      ).toBe("hello.world");
    });
  });

  describe("sentence-case", () => {
    it("converts simple string to sentence case", () => {
      expect(
        parseStringCase({
          input: testStrings.simple,
          caseType: "sentence-case",
        })
      ).toBe("Hello");
    });

    it("converts multi-word string to sentence case", () => {
      expect(
        parseStringCase({
          input: testStrings.multiWord,
          caseType: "sentence-case",
        })
      ).toBe("Hello world");
    });

    it("converts uppercase string to sentence case", () => {
      expect(
        parseStringCase({ input: "HELLO WORLD", caseType: "sentence-case" })
      ).toBe("Hello world");
    });

    it("handles mixed case input", () => {
      expect(
        parseStringCase({
          input: testStrings.mixedCase,
          caseType: "sentence-case",
        })
      ).toBe("Hello world test");
    });

    it("handles sentence input", () => {
      expect(
        parseStringCase({
          input: testStrings.sentence,
          caseType: "sentence-case",
        })
      ).toBe("This is a long sentence with many words");
    });

    it("trims spaces", () => {
      expect(
        parseStringCase({
          input: testStrings.withSpaces,
          caseType: "sentence-case",
        })
      ).toBe("Hello world");
    });
  });

  describe("capitalize", () => {
    it("capitalizes simple string", () => {
      expect(
        parseStringCase({ input: testStrings.simple, caseType: "capitalize" })
      ).toBe("Hello");
    });

    it("capitalizes multi-word string", () => {
      expect(
        parseStringCase({
          input: testStrings.multiWord,
          caseType: "capitalize",
        })
      ).toBe("Hello world");
    });

    it("capitalizes uppercase string", () => {
      expect(
        parseStringCase({ input: "HELLO WORLD", caseType: "capitalize" })
      ).toBe("Hello world");
    });

    it("handles mixed case input", () => {
      expect(
        parseStringCase({
          input: testStrings.mixedCase,
          caseType: "capitalize",
        })
      ).toBe("Hello world test");
    });

    it("handles single character", () => {
      expect(
        parseStringCase({
          input: testStrings.singleChar,
          caseType: "capitalize",
        })
      ).toBe("A");
    });

    it("handles lowercase single character", () => {
      expect(parseStringCase({ input: "a", caseType: "capitalize" })).toBe("A");
    });
  });

  describe("alternating-case", () => {
    it("converts simple string to alternating case", () => {
      expect(
        parseStringCase({
          input: testStrings.simple,
          caseType: "alternating-case",
        })
      ).toBe("hElLo");
    });

    it("converts multi-word string to alternating case", () => {
      expect(
        parseStringCase({
          input: testStrings.multiWord,
          caseType: "alternating-case",
        })
      ).toBe("hElLo WoRlD");
    });

    it("handles mixed case input", () => {
      expect(
        parseStringCase({ input: "Hello", caseType: "alternating-case" })
      ).toBe("hElLo");
    });

    it("handles single character", () => {
      expect(
        parseStringCase({ input: "A", caseType: "alternating-case" })
      ).toBe("a");
    });

    it("preserves spaces and special characters", () => {
      expect(
        parseStringCase({ input: "hello world!", caseType: "alternating-case" })
      ).toBe("hElLo WoRlD!");
    });

    it("handles numbers", () => {
      expect(
        parseStringCase({ input: "hello123", caseType: "alternating-case" })
      ).toBe("hElLo123");
    });
  });

  describe("inverse-case", () => {
    it("inverts simple lowercase string", () => {
      expect(
        parseStringCase({ input: testStrings.simple, caseType: "inverse-case" })
      ).toBe("HELLO");
    });

    it("inverts simple uppercase string", () => {
      expect(
        parseStringCase({ input: "HELLO", caseType: "inverse-case" })
      ).toBe("hello");
    });

    it("inverts mixed case string", () => {
      expect(
        parseStringCase({ input: "Hello World", caseType: "inverse-case" })
      ).toBe("hELLO wORLD");
    });

    it("inverts camelCase string", () => {
      expect(
        parseStringCase({
          input: testStrings.camelCase,
          caseType: "inverse-case",
        })
      ).toBe("HELLOwORLD");
    });

    it("preserves numbers and special characters", () => {
      expect(
        parseStringCase({ input: "Hello123!", caseType: "inverse-case" })
      ).toBe("hELLO123!");
    });

    it("handles single character", () => {
      expect(parseStringCase({ input: "A", caseType: "inverse-case" })).toBe(
        "a"
      );
      expect(parseStringCase({ input: "a", caseType: "inverse-case" })).toBe(
        "A"
      );
    });
  });

  describe("edge cases", () => {
    it("handles empty string for all case types", () => {
      const caseTypes = [
        "upper-case",
        "lower-case",
        "title-case",
        "camel-case",
        "pascal-case",
        "snake-case",
        "kebab-case",
        "constant-case",
        "dot-case",
        "sentence-case",
        "capitalize",
        "alternating-case",
        "inverse-case",
      ] as const;

      caseTypes.forEach((caseType) => {
        expect(parseStringCase({ input: "", caseType })).toBe("");
      });
    });

    it("handles only spaces string", () => {
      expect(
        parseStringCase({
          input: testStrings.onlySpaces,
          caseType: "upper-case",
        })
      ).toBe("");
      expect(
        parseStringCase({
          input: testStrings.onlySpaces,
          caseType: "camel-case",
        })
      ).toBe("");
    });

    it("handles single character for all case types", () => {
      expect(parseStringCase({ input: "a", caseType: "upper-case" })).toBe("A");
      expect(parseStringCase({ input: "A", caseType: "lower-case" })).toBe("a");
      expect(parseStringCase({ input: "a", caseType: "title-case" })).toBe("A");
      expect(parseStringCase({ input: "a", caseType: "camel-case" })).toBe("a");
      expect(parseStringCase({ input: "a", caseType: "pascal-case" })).toBe(
        "A"
      );
    });

    it("throws error for unsupported case type", () => {
      expect(() => {
        parseStringCase({ input: "hello", caseType: "invalid-case" as any });
      }).toThrow("Unsupported case type: invalid-case");
    });
  });

  describe("complex transformations", () => {
    it("handles mixed symbols correctly", () => {
      const input = testStrings.mixedSymbols;

      expect(parseStringCase({ input, caseType: "camel-case" })).toBe(
        "helloWorldTestCase"
      );
      expect(parseStringCase({ input, caseType: "pascal-case" })).toBe(
        "HelloWorldTestCase"
      );
      expect(parseStringCase({ input, caseType: "snake-case" })).toBe(
        "hello_world_test_case"
      );
      expect(parseStringCase({ input, caseType: "kebab-case" })).toBe(
        "hello-world-test-case"
      );
    });

    it("handles acronyms in different cases", () => {
      const input = testStrings.acronym;

      expect(parseStringCase({ input, caseType: "camel-case" })).toBe(
        "htmlCssJs"
      );
      expect(parseStringCase({ input, caseType: "pascal-case" })).toBe(
        "HtmlCssJs"
      );
      expect(parseStringCase({ input, caseType: "snake-case" })).toBe(
        "html_css_js"
      );
      expect(parseStringCase({ input, caseType: "kebab-case" })).toBe(
        "html-css-js"
      );
    });

    it("handles numbers with letters", () => {
      const input = testStrings.withNumbers;

      expect(parseStringCase({ input, caseType: "kebab-case" })).toBe(
        "hello123world"
      );
      expect(parseStringCase({ input, caseType: "snake-case" })).toBe(
        "hello123world"
      );
      expect(parseStringCase({ input, caseType: "title-case" })).toBe(
        "Hello123world"
      );
    });
  });

  describe("parseStringCase > all case types", () => {
    const input = "Hello WORLD test_case-EXAMPLE";

    const cases: CaseTypeProps[] = [
      "upper-case",
      "lower-case",
      "title-case",
      "camel-case",
      "pascal-case",
      "snake-case",
      "kebab-case",
      "constant-case",
      "dot-case",
      "sentence-case",
      "capitalize",
      "alternating-case",
      "inverse-case",
    ];

    cases.forEach((caseType) => {
      it(`should handle caseType "${caseType}"`, () => {
        const result = parseStringCase({ input, caseType });
        expect(typeof result).toBe("string");
      });
    });
  });
});
