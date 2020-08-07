const getHeaderLinks = (loggedIn, user) => {

    const userLinks = [
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
            href: `/profile/${user && user._id}`
        }

    ];

    const guestLinks = [
        {
            title: 'Login',
            href: '/login'
        },
        {
            title: 'Register',
            href: '/register'
        }
    ]

    return loggedIn ? userLinks : guestLinks;
}

export default getHeaderLinks;