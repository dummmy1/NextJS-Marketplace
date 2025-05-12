module.exports = {
  extends: ["next", "next/core-web-vitals"],
  rules: {
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/no-explicit-any": "off", // optional: disables "any" errors on Vercel
  },
};
