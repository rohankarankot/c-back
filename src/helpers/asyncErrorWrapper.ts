export const asyncErrorWrapper = (fn: Function) => {
    return async (...args: any[]) => {
        try {
            return await fn(...args);
        } catch (error) {
            console.error('Error in async operation:', error);
            // Customize the error handling based on error type
            throw error;
        }
    };
};
