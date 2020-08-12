const authService = async (url, body, onSuccess, onFailure) => {
    try {
        const authPromise = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!authPromise.ok) {
            const checkResult = await authPromise.json();
            throw new Error(JSON.stringify(checkResult));
        }
        const authToken = authPromise.headers.get('Authorization');
        document.cookie = `x-auth-token=${authToken}`;

        const authResult = await authPromise.json();

        if (authResult.username && authToken) {
            onSuccess({
                username: authResult.username,
                _id: authResult._id,
                userAccess: authResult.userAccess,
                profilePhoto: authResult.profilePhoto
            });
        } else {
            onFailure();
        }
    } catch (err) {
        onFailure(err);
    }
}

export default authService;