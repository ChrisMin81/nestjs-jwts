export const pick = <T extends NonNullable<unknown>, K extends keyof T>(obj: T, ...keys: K[]) => (
    Object.fromEntries(
        keys
            .filter(key => key in obj)
            .map(key => [key, obj[key]])
    ) as Pick<T, K>
);

// export const inclusivePick = <T extends NonNullable<unknown>, K extends (string | number | symbol)>(
//     obj: T, ...keys: K[]
// ) => (
//     Object.fromEntries(
//         keys
//             .map(key => [key, obj[key as unknown as keyof T]])
//     ) as { [key in K]: key extends keyof T ? T[key] : undefined }
// )
