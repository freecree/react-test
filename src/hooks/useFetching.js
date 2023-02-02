import {useState, useEffect} from 'react';

export const useFetching = (callback) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    async function fetchings() {
        try {
            setLoading(true);
            await callback();
        } catch(e) {
            console.log("fetching error catched", e);
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }
    return [loading, fetchings, error];
}