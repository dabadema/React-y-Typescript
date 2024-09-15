import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { CryptoCurrency, CryptoPrice, Pair } from './types';
import { fetchCurrentCryptoPrice, getCryptos } from './services/CryptoService';

type CryptoStore = {
    cryptocurrencies: CryptoCurrency[];
    result: CryptoPrice;
    loading: boolean;
    fetchCryptos: () => Promise<void>;
    fetchData: (pair: Pair) => Promise<void>;
};

export const useCryptoStore = create<CryptoStore>()(
    devtools((set) => ({
        cryptocurrencies: [],
        result: {
            IMAGEURL: '',
            PRICE: '',
            HIGHDAY: '',
            LOWDAY: '',
            CHANGEPCT24HOUR: '',
            LASTUPDATE: '',
        },
        loading: false,
        fetchCryptos: async () => {
            const cryptocurrencies = await getCryptos();
            set(() => ({
                cryptocurrencies,
            }));
        },
        fetchData: async (pair) => {
            set(() => ({
                loading: true,
            }));

            const resultPromise = fetchCurrentCryptoPrice(pair);
            const delayPromise = new Promise((resolve) => setTimeout(resolve, 1000));

            const [result] = await Promise.all([resultPromise, delayPromise]);

            set(() => ({
                result,
                loading: false,
            }));
        },
    }))
);
