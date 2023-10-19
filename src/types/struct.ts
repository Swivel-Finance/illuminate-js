/**
 * A generic struct type.
 *
 * @remarks
 * We use this type as basis for structs returned by the illuminate contracts.
 * This helps us with tests later on, as struct types are unwrapped differently
 * than BigNumbers or other types.
 */
export interface Struct {
    [name: string]: unknown;
}
