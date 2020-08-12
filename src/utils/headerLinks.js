const getHeaderLinks = (loggedIn, user) => {

    const userLinks = [
        {
            title: 'Explore',
            href: '/explore'
        },
        {
            title: 'Profile',
            href: `/profile/${user && user._id}`
        }

    ];

    const adminLinks = [
        {
            title: 'Manage Content',
            href: '#'
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

    if (loggedIn) {
        if (user && user.userAccess === 'user') {
            return userLinks;
        } else {
            return adminLinks;
        }
    } else {
        return guestLinks;
    }
}

export default getHeaderLinks;