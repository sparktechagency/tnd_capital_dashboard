/* eslint-disable @typescript-eslint/no-explicit-any */
type FieldData = {
    inputName?: string;
    inputType?: string;
    label?: string;
    placeholder?: string;
};

type GroupedData = {
    [id: string]: FieldData;
};


export const groupedDataFunction = (values: any) => {
    const groupedData: GroupedData = Object.keys(values).reduce(
        (acc: GroupedData, key: string) => {
            const [id, field] = key.split("-");
            if (!acc[id]) {
                acc[id] = {};
            }

            acc[id][field as keyof FieldData] = values[key];

            return acc;
        },
        {}
    );

    return groupedData
}
