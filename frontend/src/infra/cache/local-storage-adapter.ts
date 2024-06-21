export interface GetStorage {
	get: (key: string) => unknown;
}

export interface SetStorage {
	set: <R = unknown>(key: string, object?: R) => void;
}

class LocalStorageAdapter implements SetStorage, GetStorage {
	private static instance: SetStorage & GetStorage;

	set<R>(key: string, value?: R): void {
		if (value) {
			localStorage.setItem(key, JSON.stringify(value).replaceAll('"', ''));
		} else {
			localStorage.removeItem(key);
		}
	}

	get(key: string): unknown {
		return localStorage.getItem(key);
	}

	public static getInstance(): SetStorage & GetStorage {
		if (!this.instance) {
			this.instance = new LocalStorageAdapter();
		}

		return this.instance;
	}
}

const localStorageAdapter = LocalStorageAdapter.getInstance() as SetStorage & GetStorage;
const getStorage = localStorageAdapter as GetStorage;
const setStorage = localStorageAdapter as SetStorage;

export { getStorage, localStorageAdapter, setStorage };

