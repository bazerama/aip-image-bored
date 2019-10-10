module.exports = {
    apps : [{
        name   : "mcu-online",
        script : "yarn",
        args : "dev",
        env : {
            "NODE_ENV": "production",
            "REACT_APP_SEARCH_API_ENV": "http://api.svaughan.co"
        }
    }]
}
