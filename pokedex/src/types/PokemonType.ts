export type PokemonType = {
    id: string,
    name: string,
    height: number,
    weight: number,
    abilities: [
        {
            is_hidden: boolean,
            slot: number,
            ability: {
                name: string,
                url: string
            }
        }
    ],
    stats: [
        {
            base_stat: number,
            effort: number,
            stat: {
                name: string,
                url: string
            }
        }
    ]
    types: [
        {
            slot: number,
            type: {
                name: string,
                url: string
            }
        }
    ],
    sprites: {
        front_default: string,
        other: {
            "official-artwork": {
                front_default: string
            }
        }
    }
}