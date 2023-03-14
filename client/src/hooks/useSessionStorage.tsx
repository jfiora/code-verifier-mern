import React from 'react';

export const useSessionStorage = (key: string): any | boolean => {
    const storedValue = sessionStorage.getItem(key);

    if (!storedValue) {
        return false;
    }

    return storedValue;
};
