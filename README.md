# Project Overview
PunchIT is a digital loyalty program designed to help retail stores implement a modern, hassle-free rewards system. We have seen that studies show 83% of customers enrolled in a loyalty program return to a store at least once, proving that a well-structured rewards system is key to customer retention. Traditional paper stamp cards are outdated. They get lost, forgotten, and do not have the ability to keep customers engaged. In today’s digital world, customer retention and direct engagement are more important than ever. Without features like push notifications and real-time updates, physical stamp cards can’t keep up.

What we offer:
Businesses can create their own unique loyalty cards, tailored to their brand and customer base. Customers can collect virtual stamps with each purchase, track their progress, and easily redeem rewards at their favorite stores. In the end, our mission is to help local businesses. We want to give these small businesses a tool to compete with big brands through our loyalty program. By modernizing this type of rewards program, we can ensure local shops that we love in Amherst, Boston, and beyond, will stay competitive, one punch at a time.

## Functional Requirements:

### Business View:
- Business owners will be able to register, add, and modify loyalty programs very intuitively.
- Send push notifications towards their customer base, encouraging promotions or location-based offers.
- See detailed statistics and analytics based on customer behavior, spending habits, and redemption trends.

### Customer View:
- Customers will be able to sign up and create an account where they can collect and redeem their digital stamps.
- Scan QR codes at participating stores to redeem points/rewards.
- Will be able to view and manage user profile, including transaction and redemption history, and personal information.
- Customers can redeem rewards for referrals and providing valuable feedback.

### User Testing:
- QR Code scanning functionality not implemented yet
- Users can test adding stamps using a code provided by the business instead
- The secret keys are added by default into the database and can be used as following:
- Input "secret-key-n" (where n is any number 1-10, for ex, secret-key-1) in the Enter Secret Key field on the Scan page to increase your stamps

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
