declare module '*.png' {
  const content: import('react-native').ImageSourcePropType;
  export default content;
}

declare module '*.otf' {
  const content: import('expo-font').FontSource;
  export default content;
}
