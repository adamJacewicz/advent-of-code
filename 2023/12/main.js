function countArrangements(row) {
	// Funkcja pomocnicza do generowania wszystkich możliwych konfiguracji dla danego wiersza
	function generateConfigurations(prefix, remainingDamagedGroups) {
		if (remainingDamagedGroups.length === 0) {
			// Osiągnięto koniec listy grup uszkodzonych
			configurations.add(prefix);
			return;
		}

		const groupSize = remainingDamagedGroups.shift();

		// Spróbuj dodać uszkodzoną grupę na różne pozycje
		for (let i = 0; i <= prefix.length - groupSize; i++) {
			const newPrefix = prefix.slice(0, i) + '#'.repeat(groupSize) + prefix.slice(i + groupSize);
			generateConfigurations(newPrefix, [...remainingDamagedGroups]);
		}
	}

	// Usuń spacje z wiersza
	row = row.replace(/\s/g, '');

	// Podziel wiersz na sekcje, oddzielając je od siebie znakiem ','
	const [springConfig, damagedGroups] = row.split(/\s+/);

	// Inicjalizuj zbiór konfiguracji i generuj je
	const configurations = new Set();
	generateConfigurations(springConfig, damagedGroups.split(',').map(Number));

	// Zwróć liczbę unikalnych konfiguracji
	return configurations.size;
}

// Przykładowe dane wejściowe
const input = `
???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1
`;

// Podziel dane wejściowe na linie i oblicz sumę konfiguracji dla każdego wiersza
const rows = input.trim().split('\n');
const totalArrangements = rows.reduce((sum, row) => sum + countArrangements(row), 0);

console.log(totalArrangements);
