declare module '*.png' {
  const content: import('react-native').ImageSourcePropType;
  export default content;
}

declare module '*.otf' {
  const content: import('expo-font').FontSource;
  export default content;
}

interface RequireContext {
  keys(): string[];
  <T>(id: string): T;
}

interface NodeRequire {
  context(
    directory: string,
    useSubdirectories?: boolean,
    regExp?: RegExp
  ): RequireContext;
}
