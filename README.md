Generates tailwind css color utility classes for our non tailwind admin.css file.
This allows you to use classes such as bg-brand-color or text-brand-color within the admin dashboard.

## Installation
```
npm i lifted-logic-tailwind-colors --save-dev
```

Once installed, add the following to the end of the admin section of the postcss.config.js
```
'lifted-logic-tailwind-colors': {},
```

Add the following to the top of admin.css
```
@llTailwindColors;
```
