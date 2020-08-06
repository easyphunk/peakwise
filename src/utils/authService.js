const authService = async (url, body, onSuccess, onFailure) => {
    try {
        const authPromise = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(!authPromise.ok) throw new Error();
        const authToken = authPromise.headers.get('Authorization');
        document.cookie = `x-auth-token=${authToken}`;

        const authResult = await authPromise.json();

        if (authResult.username && authToken) {
            onSuccess({
                username: authResult.username,
                id: authResult._id,
                userAccess: authResult.userAccess,
                profilePhoto: authResult.profilePhoto
            });
        } else {
            onFailure();
        }
    } catch (err) {
        onFailure();
    }
}

export default authService;