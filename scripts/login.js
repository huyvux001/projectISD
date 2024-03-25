const qs = document.querySelector.bind(document);

const loginBtn = qs('.form-submit');
const email = qs('[data-email]');
const password = qs('[data-password]');

const showError = ({inputNode, message}) => {
    const parent = inputNode.closest('.form-group');
    const errorNode = parent.querySelector(".form-error");
    errorNode.textContent = message;
}

const hiddenError = ({inputNode}) => {
    const parent = inputNode.closest('.form-group');
    const errorNode = parent.querySelector(".form-error");
    errorNode.textContent = "";
}

const validate = ({type, value, min, inputNode, message}) => {
    console.log(value)
    if(type==="isEmail"){
        if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)){
            showError({
                inputNode,
                message
            })
            return false;
        }else{
            hiddenError({
                inputNode,
            })
            return true;
        }
    }

    if(type==="isRequired"){
        if(value && value.trim() !== ''){
            hiddenError({
                inputNode,
            })
            return true;
        }else{
            showError({
                inputNode,
                message
            })
            return false;
        }
    }

    if(type==="isMinLen"){
        if(value && value.length >= min){
            hiddenError({
                inputNode,
            })
            return true;
        }else{
            showError({
                inputNode,
                message
            })
            return false;
        }
    }

}

const hiddenErrors = () => {
    const errorNodes = document.querySelectorAll(".form-error");
    errorNodes.forEach(errorNode => errorNode.textContent = "");
}

loginBtn.onclick = async() => {
    let isPassed = true;
    /**
     * Validations
     */
    isPassed = validate(
        {
            type: 'isRequired',
            value: email.value,
            message: "The email must be not empty",
            inputNode: email
        }
    );


    isPassed = validate(
        {
            type: 'isEmail',
            value: email.value,
            message: "Email must be in the right format",
            inputNode: email

        }
    );

    isPassed = validate(
        {
            type: 'isRequired',
            value: email.value,
            message: "The email must be not empty",
            inputNode: password
        }
    );

    isPassed = validate(
        {
            type: 'isMinLen',
            value: password.value,
            message: "The password must have length of 8 at least",
            inputNode: password,
            min: 8
        }
    );

    if(!isPassed) return;

    /**
     * Send request
    */
    const res = await fetch(`http://localhost:3000/login?email=${email.value||1}&password=${password.value||1}`)
    const users = await res.json();

    const errorNode = qs("[data-auth-error]");
    if(!users[0]){
        errorNode.textContent = "Email or password is wrong";
        return;
    }

    errorNode.textContent = "";
    qs("body").innerHTML = '...loading';
    setTimeout(() => {
        window.location.assign('/pages/home.html')
    }, 5000)
}