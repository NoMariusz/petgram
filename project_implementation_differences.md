# Protokół różnic między implementacją, a projektem

Rozdział ten przedstawia zestawienie rozbieżności pomiędzy pierwotnymi założeniami opisanymi w dokumentacji projektu a faktycznym stanem zrealizowanej aplikacji. Poniżej przedstawiono zarówno najważniejsze różnice jak i ich uzasadnienia w podziale na różnice w funkcjach i architekturze.

- Różnice w specyfikacji funkcjonalnej - Nie zaimplementowano wszystkich planowanych elementów ze względu na brak czasu niezbędnego do wdrożenia skomplikowanego systemu w przeciągu połowy semestru.
    - Funkcje podstawowe, które nie zostały zaimplementowane:
        - Obsługa materiałów wideo oraz galerii zdjęć i filmów - Elementy te zostały pominięte ze względu na skomplikowanie techniczne ich obsługi oraz chęć skupienia uwagi zespołu na funkcjach, które wyróżniają projekt na tle standardowych mediów społecznościowych.

        - Zarządzanie prywatnością postów - Moduł odpowiedzialny za konfigurację poziomów widoczności treści nie został ukończony na czas. Funkcja ta w dalszym ciągu jest traktowana jako istotna, dlatego jej wdrożenie stanowi priorytet w harmonogramie przyszłych prac nad systemem.

        - Silnik polecania treści - Aktualna wersja systemu nie wykorzystuje algorytmu rekomendacji, a dobór prezentowanych materiałów opiera się na prostych zapytaniach do bazy danych. Zbudowanie funkcjonalnego silnika poleceń wymagałoby zmiany technologii na inne rozwiązania, co wiązałoby się z największym nakładem pracy spośród wszystkich omawianych elementów.

        - System tagowania - Mimo że rozwiązanie to jest uwzględnione w planach rozwoju, zdecydowano się na odłożenie jego implementacji w czasie. Priorytet nadano profilowi pupila, aby prezentowana wersja aplikacji zawierała elementy unikalne dla projektu, a nie tylko standardowe mechanizmy znane z innych serwisów.

        - Przechwytywanie obrazu - Ekran służący do tworzenia nowych publikacji nie pozwala na bezpośrednie wykonywanie zdjęć z poziomu systemu, a jedynie na przesyłanie istniejących plików. Wynika to bezpośrednio z decyzji o realizacji oprogramowania jako aplikacji przeglądarkowej.

    - Funkcje dodatkowe, które zostały zaimplementowane - Pomimo pominięcia części funkcji podstawowych, zdecydowano się na wdrożenie poniższej funkcji dodatkowej poprzez zmianę priorytetów w trakcie prac programistycznych:
        - Profil zwierzęcia. Obok profilu użytkownika przygotowano profile dla zwierząt, co stanowi kluczowy element wyróżniający system. Choć funkcja ta nie była pierwotnie zakwalifikowana jako podstawowa, jej wdrożenie pozwoliło lepiej oddać specyfikę projektu podczas prezentacji. Po realizacji tego modułu, niskim nakładem pracy dodano również powiązane opcje, takie jak oznaczanie zwierzęcia jako uczestnika w danym poście oraz możliwość tworzenia relacji i obserwowania profilu zwierzęcia przez innych użytkowników.

- Specyfikacja niefunkcjonalna - Wiele z założeń nie zostało osiągniętych ze względu na brak powiązanych modułów lub przesunięcie prac optymalizacyjnych. Poniżej opisano dokładniej niektóre punkty specyfikacji niefunkcjonalnej projektu:
    - Lekkość i szybkość aplikacji. Choć podczas pisania kodu starano się zachować te cechy, to działania takie jak optymalizacja procesów ładowania postów czy automatyczna kompresja treści nie zostały zrealizowane. Prace te zostały przeniesione na listę zadań do wykonania w kolejnych etapach.

    - Trafny algorytm w trybie mieszanym i odkrywania feedu głównego. Wymaganie to nie zostało spełnione ze względu na całkowite zaniechanie implementacji mechanizmu polecania treści.

- Różnice architektoniczne:
    - Platforma docelowa - Projekt zakładał stworzenie dedykowanej aplikacji mobilnej na smartfony jako rozwiązania priorytetowego, przy jednoczesnym udostępnieniu lżejszej wersji przeglądarkowej dla komputerów osobistych. Ostatecznie interfejs użytkownika zrealizowano wyłącznie jako aplikację webową typu Single Page Application przy użyciu biblioteki React. Decyzja ta wynikała bezpośrednio ze specyfiki zajęć projektowych, które koncentrowały się wokół technologii React. Wymagania oraz materiały dydaktyczne były dostosowane do tego środowiska, dlatego dostosowano architekturę do tych wytycznych. Dodatkową zaletą takiego podejścia była większa prostota, a więc i wyższa szybkość implementacji funkcji w środowisku przeglądarkowym niż w przypadku platform mobilnych.

    - Architektura bazy danych - W fazie projektowej zaznaczono konieczność przygotowania wysoce skalowalnej architektury od samego początku trwania prac, co miało uodpornić system na dużą liczbę użytkowników. W zaimplementowanym systemie zrezygnowano jednak z potężnego silnika na rzecz wykorzystania prostej relacyjnej bazy danych SQLite, która przechowuje dane w jednym pliku lokalnym. Rozwiązanie to wybrano świadomie, aby uprościć uruchamianie oprogramowania w środowisku deweloperskim i uniknąć skomplikowanej konfiguracji. Jednak mając na uwadze dokument projektowy przygotowano mechanizmy łączenia i wykorzystania bazy danych tak, aby migracja na bardziej zaawansowany system zarządzania baz danych przebiegła maksymalnie bezproblemowo.

    - Metody uwierzytelniania - Założenia projektowe przewidywały integrację standardowego mechanizmu rejestracji i logowania z zewnętrznymi platformami, takimi jak Google. W trakcie realizacji okazało się, że do spełnienia kryteriów oceny projektu i uzyskania maksymalnej noty wystarczające jest wdrożenie jednego mechanizmu uwierzytelniania. W związku z tym zrezygnowano z integracji z systemami zewnętrznymi, a zaoszczędzony w ten sposób czas przeznaczono na rozwój innych funkcji użytkowych.
