// Cannot load "react-refresh/babel" in production
const plugins = [
    [
        "module-resolver",
        {
          "alias": {
            "~": "./src"
          }
        }
    ]
];

if(process.env.NODE_ENV !== 'production'){
    plugins.push("react-refresh/babel");
}

module.exports = {
    presets: [
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    plugins: plugins
}