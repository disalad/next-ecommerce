export const tryUpdateSession = async (updateFn, showAlertFn) => {
    try {
        await updateFn();
    } catch (error) {
        showAlertFn(
            'Failed to update session. Try reloading the page',
            'error'
        );
    }
};
