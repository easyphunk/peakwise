const getHeaderLinks = (userid) => {
    const headerLinks = [
        {
            title: 'Login',
            href: '/login'
        },
        {
            title: 'Register',
            href: '/register'
        },
        {
            title: 'Create Article',
            href: '/create-article'
        },
        {
            title: 'Explore',
            href: '/explore'
        },
        {
            title: 'Profile',
            href: `/profile/${userid}`
        },

    ];

    return headerLinks;
}

export default getHeaderLinks;