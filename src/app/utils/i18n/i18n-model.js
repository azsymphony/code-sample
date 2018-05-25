import en from './en';

const languages = {
    en
};

class I18n {
    constructor() {
        this.language = 'en';
        this.translate = this.translate.bind(this);
        this.setLanguage = this.setLanguage.bind(this);
        this.setTranslatePrefix = this.setTranslatePrefix.bind(this);
    }
    setLanguage(newlanguage) {
        this.language = newlanguage || 'en';
    }
    setTranslatePrefix(prefix) {
        this.stringPrefix = prefix;
    }
    getString(property) {
        let string = languages[this.language];
        const stringPaths = property.split('.');
        stringPaths.forEach((path) => {
            string = string && string[path];
        });
        return string;
    }
    translate(property, values, pluralize) {
        const prefixed = this.stringPrefix ? `${this.stringPrefix}.${property}` : property;
        let string = this.getString(prefixed);
        if (!string) {
            string = this.getString(property);
        }
        if (values) {
            Object.keys(values).forEach((key) => {
                string = string.replace(`#{${key}}`, values[key]);
            });
        }
        if (typeof pluralize === 'number') {
            if (pluralize > 1) {
                string = string.replace('#{suffix}', 's');
            } else {
                string = string.replace('#{suffix}', '');
            }
        }
        return string || 'String not localized';
    }
}

const i18n = new I18n();
const { translate, setTranslatePrefix, setLanguage } = i18n;

export default i18n;
export { setTranslatePrefix };
export { setLanguage };
export { translate };
