export default class UserInfo{
    constructor({nameSelector, aboutSelector, avatarSelector}) {
        this._profileName = document.querySelector(nameSelector);
        this._profileAbout = document.querySelector(aboutSelector);
        this._profileAvatar = document.querySelector(avatarSelector);
        this._name = '';
        this._about = '';
    }
    
    getUserInfo = () => {
        return {
            name: this._profileName.textContent,
            about: this._profileAbout.textContent
        }
    }

    setUserInfo = ({name, about}) => {
        this._name = name;
        this._about = about;
        this._profileName.textContent = this._name;
        this._profileAbout.textContent = this._about;
    }

    setUserAvatar = ( {avatar}) => {
        this._profileAvatar.src = avatar;
    }
}