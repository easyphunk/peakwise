const getInputFields = (props) => {
    const inputFields = {

        login: [
            {
                name: 'username',
                type: 'text',
                label: 'Username',
                placeholder: 'Username',
                required: true,
                value: props.value
            },
            {
                name: 'password',
                type: 'password',
                label: 'Password',
                placeholder: '••••••••',
                required: true,
                value: props.value
            }
            
        ],

        register: [
            {
                name: 'username',
                type: 'text',
                label: 'Username',
                placeholder: 'Username',
                required: true,
                value: props.value
            },
            {
                name: 'password',
                type: 'password',
                label: 'Password',
                placeholder: '••••••••',
                required: true,
                value: props.value
            }
        ]
        
    }
    return inputFields;
}

export default getInputFields;
