const tripService = async (url, body, reqType, onSuccess, onFailure) => {
    try {
        const tripPromise = await fetch(url, {
            method: `${reqType}`,
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(!tripPromise.ok) throw new Error();

        const tripResult = await tripPromise.json();

        if (tripResult.name) {
            onSuccess(tripResult._id);
        } else {
            onFailure();
        }
    } catch (err) {
        onFailure();
    }
}

export default tripService;