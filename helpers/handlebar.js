
const register = (Handlebars)=>{
    const helpers = {
        disable: (value, options)=>{
            if(value >= 29)return "disabled";
        },
        warning: (value, options)=>{
            return (value <= 15) ?  "warning-color": "green";
        }
    };
    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        for (var prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        return helpers;
    }
}

module.exports.register = register;
module.exports.helpers = register(null); 