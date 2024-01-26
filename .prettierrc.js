module.exports = {
    arrowParens: 'always',
    bracketSameLine: false,
    bracketSpacing: true,
    embeddedLanguageFormatting: 'auto',
    endOfLine: 'auto',
    htmlWhitespaceSensitivity: 'css',
    insertPragma: false,
    jsxSingleQuote: false,
    printWidth: 80,
    proseWrap: 'preserve',
    quoteProps: 'as-needed',
    requirePragma: false,
    semi: true,
    singleAttributePerLine: true,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'none',
    useTabs: false,
    vueIndentScriptAndStyle: false,
    importOrderParserPlugins: ['typescript', 'decorators-legacy'],
    plugins: [
        '@ianvs/prettier-plugin-sort-imports',
        'prettier-plugin-tailwindcss'
    ],
    importOrder: [
        '^vue$',
        '<TYPES>',
        '<TYPES>^[.]',
        '<BUILTIN_MODULES>',
        '<THIRD_PARTY_MODULES>',
        '',
        '^@/domain/(.*)$',
        '',
        '^@/primary/(.*)$',
        '',
        '^@/secondary/(.*)$',
        '',
        '^@/utils/(.*)$',
        '',
        '^[./]'
    ]
};