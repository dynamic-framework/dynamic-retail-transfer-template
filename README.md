# Dynamic retail transfer template - React
## Requirements:
- node@20+
- npm@10+
- @modyo/cli@latest

## Installation and initial setup
The best way to install this template is using the [modyo-cli](https://docs.modyo.com/en/platform/channels/cli.html)

```console
npx @modyo/cli@latest get dynamic-retail-transfer-template my-project
cd my-project
npm i
npm run start
```

### Setup
1. Change the property name in `package.json` to the name of your project
2. Change the root `id` property to your project name in `public/index.html` and `src/index.tsx`

**Note**: The root id should be _unique_ in your site and it should be written in camelCase.

### Widget parameters
The widget parameters can be configured once it has been pushed to Modyo through the CLI:

+ **currency-symbol**: Graphic symbol used to denote a currency unit (example: $)
+ **currency-precision**: Number of digits placed after the decimal symbol (example: 2)
+ **currency-separator**: Symbol used to separate the integer part from the fractional part of a number (example: .)
+ **currency-decimal**: Symbol used to separate numbers with many digits (example: ,)
+ **dashboard-path**: Dashboard path URL
+ **api-path**: API path to getting all data

## Deployment to Modyo and CI
For deploying your project to Modyo and integrating it with your CI/CD pipeline, follow these steps:

Configure the necessary environment variables in an `.env` file or as part of your CI settings:

```yaml
# Base URL of your Modyo organization
MODYO_ACCOUNT_URL=https://my-org.modyo.cloud/

#Either the host or the ID where you will deploy your micro frontend (not both)
# MODYO_SITE_HOST=my-site
MODYO_SITE_ID=65

# Token for authorizing the deployment, obtained from Modyo
TOKEN=gT0ogV43LSy4nV9cYtc_hH0i_rUFa01q-12ptFzoW8

# Major version of the Modyo platform where the deployment will take place (8 or 9)
VERSION=9

# Directory containing the micro frontend bundle
BUILD_DIRECTORY=build

# Name to identify your Micro Frontend in Modyo
WIDGET_NAME=my-project

# Directive necessary for safely removing some libraries from the liquid parser
MODYO_DISABLE_LIQUID_REGEX=raw
```

## Learn More
Find more information about microfrontends and configuration details on [Modyo Docs](https://docs.modyo.com) & [Modyo Community](https://www.modyo.com/community)
