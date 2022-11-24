class UserInfo {
    constructor({nameSelector, aboutSelector, avatarSelector}) {
        this._nameSelector = nameSelector;
        this._aboutSelector = aboutSelector;
        this._avatar = avatarSelector;
        this._name = '';
        this._about = '';
        this._avatar = '';
    }

    getUserInfo(){
        return {
            name: this._nameSelector.textContent,
            about: this._aboutSelector.textContent
        }
    }

    updateUserInfo = () => {
        this._nameSelector.textContent = this._name;
        this._aboutSelector.textContent = this._about;
    }

    setUserInfo({name, about}){
        this._name = name;
        this._about = about;
    }

    setUserAvatar = ({avatar}) => {
        this._avatarSelector.src = avatar;
    }
}