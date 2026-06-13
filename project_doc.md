# 1\. Wstęp

Niniejszy dokument stanowi dokumentację projektową witryny internetowej Petgram, opracowaną w celu ustalenia i usystematyzowania założeń technicznych, merytorycznych i wizualnych. Zawiera on szczegółowe informacje dotyczące architektury informacji, wyników badań preferencji użytkowników oraz wytycznych graficznych niezbędnych do poprawnej implementacji platformy.

Głównym celem dokumentu jest precyzyjne zdefiniowanie funkcjonalności oraz struktury platformy społecznościowej dedykowanej opiekunom i miłośnikom zwierząt. Zakres opracowania obejmuje analizę domeny terminologicznej, specyfikację wymagań funkcjonalnych i pozafunkcjonalnych oraz wstępne szkice układu kompozycyjnego interfejsu.

Projekt Petgram zakłada stworzenie wyspecjalizowanej platformy społecznościowej opartej na intuicyjnym interfejsie typu vertical scrolling, przeznaczonej do publikowania i przeglądania materiałów wizualnych z udziałem zwierząt. Rozwiązanie to bezpośrednio adresuje problem przeładowania ogólnotematycznych portali treściami agresywnymi lub politycznymi, oferując użytkownikom przestrzeń dedykowaną wyłącznie tematyce zoologicznej. System umożliwi właścicielom zwierząt dokumentowanie rozwoju swoich podopiecznych, profesjonalistom budowanie marki osobistej w odpowiednim kontekście, a osobom planującym nabycie pupila dostarczy zweryfikowanych treści wizualnych o konkretnych gatunkach i rasach.

# 2\. Domena terminologii (Mapa pojęć)

Niniejszy rozdział definiuje zakres pojęciowy projektu, służący jako słownik oraz mapa inspiracji dla zespołu. Poniższa mapa pojęć przedstawia pojęcia dotyczące "platformy społecznościowej dla opiekunów i miłośników zwierząt", systematyzuje relacje pomiędzy różnymi pojęciami takimi jak: kategorie użytkowników, dane dotyczące zwierząt oraz interakcje społeczne obecne w mediach społecznościowych czy produkty dla zwierząt. Opracowana struktura pozwala również na logiczne rozmieszczenie funkcji w architekturze informacji i zapewnia spójność komunikacji między systemem a jego odbiorcami.

**Społeczność miłośników zwierząt**

- **Użytkownicy i Profile**
    - **Typy użytkowników**
        - **Opiekunowie**
            - Amatorzy
            - Hodowcy
            - Wolontariusze
        - **Profesjonaliści**
            - Weterynarze
            - Behawioryści
            - Groomerzy
            - Trenerzy
    - **Dane profilu**
        - **Informacje podstawowe**
            - Nazwa użytkownika
            - Imię i nazwisko
            - Biogram
        - **Weryfikacja**
            - Certyfikaty profesjonalisty
            - Status konta
        - **Lokalizacja**
            - Miasto
            - Kraj
    - **Relacje**
        - Obserwowani
        - Obserwujący
        - Znajomi

- **Zwierzęta (Pupile)**
    - **Metryczka**
        - Imię
        - Wiek
        - Płeć
        - Data urodzenia
    - **Identyfikacja**
        - **Klasyfikacja**
            - Gatunek
            - Rasa
            - Typ budowy
        - **Dokumentacja**
            - Numer chip
            - Rodowód
            - Paszport
    - **Cechy fizyczne**
        - Waga
        - Umaszczenie
        - Znaki szczególne
    - **Charakter**
        - Temperament
        - Poziom energii
        - Stosunek do innych zwierząt

- **Treści i Interakcje Społecznościowe**
    - **Publikacje**
        - **Formaty treści**
            - Zdjęcia
            - Krótkie filmiki wideo
            - Relacje (Stories)
        - **Opis treści**
            - Tagi rasy
            - Tagi tematyczne
            - Hashtagi
    - **Reakcje**
        - Polubienia
        - Komentarze
        - Odpowiedzi
        - Udostępnienia
    - **Zarządzanie treścią**
        - Zapisane posty
        - Raportowanie treści
        - Blokowanie użytkowników

- **Produkty i Wyposażenie**
    - **Żywienie**
        - **Karmy**
            - Karma sucha
            - Karma mokra
            - Diety specjalistyczne
        - **Dodatki**
            - Przysmaki
            - Suplementy diety
            - Witaminy
    - **Akcesoria i Zabawki**
        - **Spacer i podróż**
            - Smycze
            - Szelki i obroże
            - Transportery
            - Kagańce
        - **W domu**
            - Legowiska
            - Drapaki
            - Miski
        - **Zabawa**
            - Zabawki edukacyjne
            - Gryzaki
            - Piłki
    - **Higiena i pielęgnacja**
        - **Kosmetyki**
            - Szampony
            - Odżywki
        - **Narzędzia**
            - Szczotki i grzebienie
            - Cążki do pazurów
        - **Sanitarny**
            - Żwirki i kuwety
            - Maty higieniczne
            - Worki na nieczystości

- **Opieka, Zdrowie i Miejsca**
    - **Zdrowie i Profilaktyka**
        - **Zabiegi**
            - Szczepienia
            - Odrobaczanie
            - Sterylizacja i kastracja
        - **Dokumentacja medyczna**
            - Historia leczenia
            - Wyniki badań
    - **Usługi i Edukacja**
        - Szkolenia i tresura
        - Porady behawioralne
        - Kursy pierwszej pomocy
    - **Miejsca**
        - **Infrastruktura**
            - Gabinety weterynaryjne
            - Salony pielęgnacji
            - Wybiegi dla psów
            - Hotele dla zwierząt
        - **Organizacje**
            - Schroniska
            - Fundacje prozwierzęce
            - Stadniny i stajnie
        - **Przyroda**
            - Parki
            - Lasy
            - Plaże przyjazne zwierzętom

# 3\. Projekt badań preferencji użytkownika

Sekcja ta opisuje fundamenty biznesowe i potrzeby użytkowników końcowych, na których oparto dalsze rozdziały.

## 3.1 Wywiad z pomysłodawcą

**Geneza, wizja i cel projektu**

- Skąd wziął się pomysł na Petgram?
    - Odpowiedź: Pomysł przyszedł mi do głowy widząc jak wiele treści w współczesnych mediach społecznościowych potrafi być z konkretnej domeny, a dokładnie dotyczyć zwierząt. Część moich znajomych korzysta chociażby z Instagrama, praktycznie tylko aby publikować zdjęcia swoich pupili, więc pomyślałem, że warto stworzyć dla takich ludzi dedykowaną witrynę.
- Jaka jest główna motywacja do implementacji?
    - Odpowiedź: Chciałbym stworzyć pewną oazę spokoju, która odcina użytkownika od agresywnej polityki i innych negatywnych wiadomości. Moim celem jest dostarczenie narzędzia, które po prostu pozwala skupić się na pasji do zwierząt.
- Jaki główny problem użytkownika ma rozwiązywać ta platforma?
    - Odpowiedź: Platforma rozwiązuje problem przebodźcowania treściami niechcianymi oraz ułatwia szybkie dotarcie do materiałów z udziałem konkretnych ras czy gatunków. Eliminuje ona konieczność filtrowania ogólnych portali w poszukiwaniu czysto zwierzęcych treści.
- A jakie inne problemy użytkownika mogłaby rozwiązywać ta platforma?
    - Odpowiedź: Petgram też mógłby pomagać uporządkować cyfrowe pamiątki po naszych zwierzakach, które obecnie często gdzieś giną w galerii telefonu. Dodatkowo mógłby ułatwiać znalezienie specjalistów branży zoologicznej.
- Co ma wyróżniać Petgram na tle Instagrama i innych serwisów społecznościowych?
    - Odpowiedź: Przede wszystkim skupienie się wyłącznie na zwierzętach. Dodatkowo myślałem też o wprowadzeniu profili dedykowane konkretnym zwierzętom, a nie tylko ich właścicielom.
- Jaki jest główny cel projektu: społeczność czy dokumentowanie życia pupila?
    - Odpowiedź: To połączenie obu tych sfer, ale z naciskiem na budowanie społeczności. Dokumentowanie konkretnych pupilów to bardziej funkcja zachęcająca do dołączenia do Petgram i tej społeczności.
- Po czym poznamy, że projekt odniósł sukces?
    - Odpowiedź: Sukcesem będzie wysoka "powracalność" użytkowników, którzy by często wracali, aby sprawdzić co u ich ulubionych zwierzęcych twórców. Ważnym wskaźnikiem będzie też liczba profesjonalistów, którzy wybiorą naszą stronę jako miejsce komunikacji.
- Czy Petgram ma być platformą wyłącznie o zwierzętach, bez treści pobocznych, czy dopuszczasz także inne tematy związane ze stylem życia właścicieli?
    - Odpowiedź: Trzymałbym się sztywno tematyki zwierzęcej, aby nie rozmywać profilu platformy. Ale też nie karałbym bezpośrednio za publikowanie np. stylu życia właścicieli, jednak posty dotyczące polityki czy reklam innych branż powinny być usuwane, jeśli nie mają nic związanego ze zwierzętami

**Użytkownicy, grupy docelowe i role**

- Jakie grupy użytkowników mają korzystać z systemu?
    - Odpowiedź: Będą to przede wszystkim właściciele zwierząt domowych i egzotycznych oraz pasjonaci szukający relaksu przy oglądaniu zwierząt. Drugą kluczową grupą są profesjonaliści, tacy jak weterynarze czy behawioryści oraz osoby szukające informacji przed nabyciem pupila.
- Czy wszyscy użytkownicy mają mieć te same możliwości, czy różne role i uprawnienia?
    - Odpowiedź: Większość funkcji będzie wspólna, ale profesjonaliści dobrze, gdyby otrzymali jakieś narzędzia do lepszej prezentacji swoich kompetencji. Dodatkowo dobrze byłoby rozróżnić uprawnienia moderatorów, którzy będą dbać o porządek i kulturę wypowiedzi na stronie.
- Czy pewne grupy osób powinny być w jakiś sposób wyróżniane, jeśli tak, to na jakiej zasadzie?
    - Odpowiedź: Sądzę, że wyraźne oznaczanie czy wyróżnianie kont profesjonalistów takich jak chociażby trenerzy będzie wartością dodaną, dzięki, której użytkownik mógłby szukać specjalistów za pomocą Petgram. Jeśli chodzi o zasadę tego oznaczania, to użytkownik podczas zakładania konta mógłby sobie przypisać łatkę profesjonalisty, jednak dobrze byłoby to w jakiś sposób weryfikować. Niestety manualna weryfikacja wymagałaby dużego nakładu pracy, weryfikacja na zasadzie wpłaty pewnej kwoty, aby uzyskać status "zweryfikowano" też nie jest rozwiązaniem idealnym, o ile zapewnia jakąś ochronę przed kontami zakładanymi przez boty, to brak jej faktycznej oceny danego "fachowca", więc połączenie weryfikacji z mechanizmem "reputacji" i opinii obecnym przykładowo na platformach typowo dla profesjonalistów, mogłoby się okazać dobrym rozwiązaniem.
- Czy osoby planujące posiadanie zwierzęcia mają być osobną grupą użytkowników, a jeśli tak, to czym się charakteryzują, różnią od innych?
    - Odpowiedź: Tak, należy myśleć o nich jako osobnej grupie, która powinna mieć łatwy dostęp do materiałów edukacyjnych o konkretnych gatunkach czy rasach. Aby zapewnić im faktycznie łatwy dostęp rozważyłbym umożliwienie wyszukiwania postów w Petgram nawet dla niezalogowanych użytkowników, jako według mnie że osoba, która tylko szuka informacji nie zawsze chce zakładać konto.

**Zakres funkcjonalny i priorytety systemu**

- Z jakich najważniejszych elementów powinien się składać system?
    - Odpowiedź: Kluczowe są: feed z pionowym przewijaniem, przystępny kreator postów z tagowaniem, panel wyszukiwania treści, no i profile użytkowników i profile zwierząt. Warto też pomyśleć o czacie między osobami, usprawniłoby to zapewne komunikację z profesjonalistami.
- Które z tych elementów są najistotniejsze?
    - Odpowiedź: Zdecydowanie feed, tworzenie postów no i profile są absolutnie kluczowe, opcja wyszukiwania treści, takie "Odkrywaj" to kolejna sprawa, sam czat nie jest kluczowy, a jedynie ważny
- Czy aplikacja ma bardziej promować przeglądanie treści czy ich publikowanie?
    - Odpowiedź: Chciałbym zachować balans, ale początkowo skupimy się na promowaniu publikowania wysokiej jakości treści, aby feed był atrakcyjny dla nowych osób. Docelowo obie aktywności powinny być równie proste i zachęcające.

**Treści, publikacje i interakcje**

- Jakie typy treści mają być obsługiwane?
    - Odpowiedź: System obsługiwałby zdjęcia o wysokiej rozdzielczości oraz krótkie materiały wideo w formacie pionowym.
- Jakie interakcje mają być dostępne pod postami?
    - Odpowiedź: Użytkownicy mogliby polubić post, dodać komentarz oraz udostępnić tak jak to jest w aktualnych mediach społecznościowych.
- Czy posty mają mieć różne poziomy widoczności podobnie jak w innych serwisach społecznościowych?
    - Odpowiedź: Tak, autorzy mogliby wybrać między widocznością publiczną, dostępną tylko dla znajomych lub całkowicie prywatną. Pozwoli to na bezpieczne prowadzenie cyfrowego pamiętnika tylko dla siebie.
- Czy pewne typy treści mają być prezentowane priorytetowo użytkownikom, czy mają być traktowane równorzędnie?
    - Odpowiedź: Na głównym feedzie priorytet miałyby treści od osób, które faktycznie obserwujemy oraz te najbardziej popularne w danej kategorii. Reszta treści będzie serwowana zapewne przez algorytm dopasowujący zainteresowania.
- Jak powinien działać odtwarzacz wideo - co ma go wyróżniać z perspektywy wygody użytkownika?
    - Odpowiedź: Odtwarzacz powinien działać błyskawicznie i obsługiwać automatyczne pętle wideo bez widocznych przycięć. Chciałbym, aby przejścia między filmami były płynne i naturalne przy pionowym przesunięciu palcem.
- Czy użytkownik ma móc usuwać, ukrywać lub/i archiwizować posty, jak powinno wyglądać takie wycofywanie posta?
    - Odpowiedź: Użytkownik powinien mieć opcję ukrycia, która zdejmie post z widoku publicznego, ale zachowa go w profilu zwierzęcia i prywatnej kolekcji. Oraz usunięcia, który usunie post z wszystkich miejsc gdzie może występować.
- A czy użytkownik ma mieć możliwość zapisywania postów podobnie jak w innych serwisach społecznościowych?
    - Odpowiedź: O, dobry pomysł, faktycznie coś takiego w nich jest, jak najbardziej się to przyda, też dobrze jest korzystać ze sprawdzonych rozwiązań.
- Jak ma wyglądać kwestia zarządzania zapisanymi postami?
    - Odpowiedź: Sądzę, że można pominąć tą kwestie i po prostu zapisany post trafi do prywatnej sekcji widocznej tylko dla użytkownika.
- Czy jest przewidywane udostępnienie użytkownikowi historii swoich aktywności?
    - Odpowiedź: Nie jest to kluczowe, ale w profilu użytkownika może znaleźć się sekcja, w której będzie można przejrzeć historię polubień i komentarzy. Ułatwiłoby to powrót do treści, które kiedyś nas zainteresowały, ale ich nie zapisaliśmy.
- Czy posty mają mieć jakąś możliwość dodatkowego wyróżnienia?
    - Odpowiedź: W ramach będzie można przypiąć jeden post w ramach jego wyróżnienia, jednak nie jest to kluczowa kwestia.

**Wyświetlanie treści**

- Na jakiej zasadzie określać jakie posty powinien widzieć w swoim feedzie?
    - Odpowiedź: Feed widzę jako miks postów od obserwowanych osób oraz rekomendacji opartych na interakcjach użytkownika w sensie polubienia, komentarze, zwłaszcza patrzeniu na interakcje z konkretnymi rasami czy gatunkami.
- Które rodzaje postów mają mieć priorytet podczas wyświetlania na feed?
    - Odpowiedź: Najwyższy priorytet mają treści od znajomych i obserwowanych twórców, inne popularne treści potem.
- Czy kolejność wyświetlania treści ma być chronologiczna, czy oparta na innych zasadach?
    - Odpowiedź: Niewyświetlone treści pochodzące od znajomych i obserwowanych osób powinny się wyświetlać chronologicznie, jednak pozostałe można by oprzeć o jakiś algorytm polecania postów.
- Jakie inne cechy powinno mieć wyświetlanie treści?
    - Odpowiedź: Hmmm, ważne jest aby zastosować mechanizm nieskończonego przewijania, aby przyciągnąć użytkownika tak jak to robią TikTok, czy Instagram.
- Czy użytkownik ma móc filtrować feed?
    - Odpowiedź: Nie, do przeglądania treści będzie osobny panel wyszukiwania/odkrywaj, feed będzie miał ustalony przez nas zestaw treści według zasad o których mówiłem wcześniej.

**Zwierzęta, profile i dokumentowanie**

- Co ma dokładnie umożliwiać moduł dokumentowania zwierzęcia?
    - Odpowiedź: Moduł ten ma przede wszystkim grupować posty dotyczące danego pupila, móc dodać informacje o nim, tak jak na Facebooku wypełniamy czasami informacje o sobie,.
- Jakie dane o zwierzęciu mają być możliwe do uzupełnienia?
    - Odpowiedź: Poza imieniem i rasą użytkownik mógł by wpisać datę urodzenia, temperament, ogólnie jakieś bio, czy upodobania, co może się przydać np. gdyby znajomi chcieli kupić jakiś prezent dla owego pupila. Może bio mogłoby się składać z jakiś stale ustalonych sekcji typu temperament, upodobania i inne. Ważne, aby nie dawać tam danych, które się zmieniają, jak wiek, waga, wzrost itp.
- Jak ma wyglądać relacja między zwierzętami, a profilami użytkowników?
    - Odpowiedź: Jeden profil właściciela będzie mógł zarządzać wieloma profilami zwierząt, ale pasuje rozważyć też opcję współdzielenia opieki, gdzie np. dwoje domowników może publikować posty na tym samym profilu pupila.
- W jaki sposób aplikacja ma pomagać użytkownikowi porządkować wspomnienia i rozwój pupila lepiej niż zwykła galeria w telefonie?
    - Odpowiedź: Tak podsumowując to dzięki profilowi zwierzęcia właśnie, bo w przypadku gdy mamy galerię w telefonie i kilku pupilów to ciężko te zdjęcia pogrupować, też w galerii są to tylko zdjęcia czy filmy, w Petgram byłyby to posty, a więc więcej informacji bo np. Jakaś tytuł posta, data no i też tagi, które tą treść dopełniają.
- Czy dokumentowanie pupila ma mieć dodatkowe elementy?
    - Odpowiedź: Oś czasu to byłby fajny pomysł na przyszły rozwój, który pozwoliłby na szybki przegląd postów według wieku zwierzaka.

**Wyszukiwanie, tagowanie i organizacja treści**

- Po jakich elementach użytkownik mógłby wyszukiwać treści?
    - Odpowiedź: Wyszukiwarka obsługiwałaby na pewno tagi, gatunki, rasy i lokalizację.
- Jak szczegółowy ma być system tagowania treści i jakie tagi powinny być najważniejsze?
    - Odpowiedź: Na pewno tagi dotyczące gatuków i ras są najważniejsze, no i powinny być stworzone odgórnie w oparciu o listę gatunków i ras dostępną na profilu zwierzęcia, jednak poza nimi widziałbym zupełnie dowolne tagi jakie tylko użytkownicy wymyślą.
- Czy część tagów lub parametrów zwierzęcia powinna być obowiązkowa, aby ułatwić wyszukiwanie i porządkowanie treści?
    - Odpowiedź: Przy zakładaniu profilu zwierzęcia gatunek i rasa powinny być obowiązkowe, aby zachować porządek w bazie, przy samych postach nie chcemy przymuszać do tagowania, aby nie zniechęcać do szybkiej publikacji, ale po oznaczeniu zwierzęcia w poście możnaby automatycznie dodać tagi jego gatunku i rasy, aby usprawnić proces.

**Konto użytkownika, prywatność i bezpieczeństwo**

- Jakie sposoby logowania mają być dostępne?
    - Odpowiedź: Standardowe logowanie przez e-mail oraz szybkie logowanie przez konta Google, Microsoft czy Apple, to chyba obecnie standard i bym się tego trzymał.
- Jakie dane użytkownika są wymagane przy zakładaniu konta?
    - Odpowiedź: Hmm, jedynie unikalna nazwa użytkownika, adres e-mail oraz hasło, bo chcemy zbierać minimum danych, aby proces rejestracji był jak najszybszy, ale oczywiście dodatkowo można wypełnić bio i lokalizację.
- Jakie dane mają być publiczne, a jakie prywatne?
    - Odpowiedź: Publiczne będą nazwa użytkownika, biogram i profile zwierząt, a adres e-mail, dane logowania oraz szczegółowe statystyki aktywności pozostaną widoczne tylko dla właściciela konta.
- Czy przewidywany jest mechanizm kontroli treści?
    - Odpowiedź: Tak, trzeba, więc wprowadziłbym system zgłaszania naruszeń przez społeczność i takie naruszania byłyby rozpatrywane przez moderatorów.
- Jak powinno wyglądać zgłaszanie postów, komentarzy i kont?
    - Odpowiedź: Standardowo jak w podobnych serwisach, przy każdym poście czy profilu znajdzie się ikona z menu, pod którym ukryjemy opcję „Zgłoś". Użytkownik będzie musiał wybrać krótki powód zgłoszenia, co pomoże nam w szybkiej weryfikacji.
- Czy potrzebne są jakieś inny mechanizmy izolowania się od niepożądanych treści?
    - Odpowiedź: Faktycznie dobrze byłoby wprowadzić funkcję blokowania kont oraz opcję „Nie interesuje mnie to", która wpłynie na algorytm wyświetlania treści.

**Struktura aplikacji i nawigacja**

- Jakie główne ekrany lub moduły powinny znaleźć się w aplikacji?
    - Odpowiedź: Główne filary to Feed, wyszukiwanie/odkrywaj, dodawnie treści, zapewne czat, profile czyli profil użytkownika i profil pupila, zapewne jakiś moduł edycji profilu, ustawienia, zapisane treści.
- Jak użytkownik powinien poruszać się po systemie? Czy struktura powinna być bardziej płaska czy hierarchiczna?
    - Odpowiedź: Postawiłbym na strukturę płaską, gdzie najważniejsze sekcje są dostępne za pomocą jednego kliknięcia. Unikałbym głębokiego zagnieżdżania menu, aby nawigacja była błyskawiczna.
- Czy główna nawigacja powinna być dolna, boczna czy górna?
    - Odpowiedź: To chyba decyzja dla doświadczonego UX designera, ja byłbym za dolną przynajmniej dla aplikacji mobilnej.
- Jakie sekcje powinny być dostępne z poziomu głównego menu?
    - Odpowiedź: Feed, wyszukiwanie/odkrywaj, dodawnie treści, zapewne czat, profil użytkownika.
- Co jest kluczowe w kontekście tworzenia posta?
    - Odpowiedź: Sądzę, że szybka możliwość zrobienia tego, więc szybko dostęp do opcji dodania posta, no i nie wymuszanie za dużej ilości elementów do wypełnienia są według mnie dobrymi pomysłami.
- Czy profil użytkownika i profil zwierzęcia powinny być oddzielnymi ekranami czy powinny być połączone?
    - Odpowiedź: Powinny być jakoś połączone w ramach jednego widoku, gdzie np. pod danymi właściciela znajdą się karty lub ikony poszczególnych zwierząt, tak aby z profilu użytkownika był łatwy dostęp do jego pupili.
- Czy koniecznie feed/sekcja "odkrywaj" powinny być osobnymi modułami?
    - Odpowiedź: Tak, Feed to miejsce dla treści, które wybraliśmy, czyli obserwujemy, a Odkrywaj to okno na świat nowych trendów, sądzę, że dobrze to jawnie rozdzielić.
- Czy ustawienia powinny być osobnym modułem czy częścią profilu?
    - Odpowiedź: Sądzę, że ustawienia będą dostępne z poziomu profilu pod jakąś ikoną „koła zębatego". Raczej nie chcę, aby zajmowały miejsce w głównej nawigacji, bo zagląda się tam rzadziej.

**Estetyka**

- Jaki charakter ma mieć interfejs?
    - Odpowiedź: Interfejs powinien być ciepły, przyjazny i budzić zaufanie, unikając przy tym przesadnej infantylności. Stawiałbym też na czystość formy, która będzie pasować do wszystkich zdjęć zwierząt.
- Jakie kolory najlepiej pasują do marki i grupy docelowej?
    - Odpowiedź: Według mnie, a ekspertem nie jestem, może takie kolory ziemi: stonowane brązy, beże i łagodna zieleń, kojarzące się z naturą, ale w cieplejszych barwach, np. miodowym lub terakocie.
- Czy są kolory, style albo przykłady aplikacji, których nie chcesz powielać?
    - Odpowiedź: Chcę unikać agresywnych, neonowych barw oraz stylu zbyt korporacyjnego i zimnego.
- A jakie są kolory, style albo przykłady aplikacji, które chcesz powielać?
    - Odpowiedź: Tak jak wcześniej mówiłem, kolory naturalne, czyli zieleń, brąz, pomarańcz, a jako przykład aplikacji to Pawfit jest przyjazna, a przy tym prosta.
- Czy interfejs ma być bardziej nowoczesny/minimalistyczny czy bardziej ilustracyjny/dekoracyjny?
    - Odpowiedź: Szczerze to jestem rozdarty, bo do tematyki zwierząt pasują te ilustracje i dekoracje, jednak to media społecznościowe i głównym aspektem będą zdjęcia czy filmy zwierząt i nie należy chyba użytkownika od nich odciągać, więc raczej w stronę minimalizmu, ale wysoce przyjaznego i estetycznego.

**Scenariusze użycia**

- Jaki jest idealny scenariusz pierwszego użycia aplikacji przez nowego użytkownika?
    - Odpowiedź: Użytkownik rejestruje się, w 30 sekund zakłada profil swojego pierwszego zwierzaka i od razu widzi na feedzie zachwycające zdjęcia innych zwierząt tej samej rasy.
- Co użytkownik powinien zrobić w ciągu pierwszych 2-3 minut po wejściu na platformę?
    - Odpowiedź: Powinien przewinąć kilka postów w feedzie, i znaleźć tam coś interesującego, zaobserwować dwa interesujące konta i potem opublikować pierwsze zdjęcie swojego zwierzaka. Też dlatego ważne będzie założenie od razu profilu zwierzaka, aby wiedzieć jakie posty polecić, albo chociaż poprosić użytkownika o podanie zainteresowań jeśli nie ma pupila.
- Jaka ma być najczęstsza ścieżka korzystania z systemu?
    - Odpowiedź: Otwarcie aplikacji, przejrzenie nowych postów od znajomych albo sprawdzenie wiadomości, zamknięcie aplikacji.
- W jakich sytuacjach użytkownik ma wracać do aplikacji codziennie, a w jakich okazjonalnie?
    - Odpowiedź: Codziennie dla przeglądania treści, komentowania i polubiania postów, przejrzenia wiadomości od znajomych, lub dodawania posta, a okazjonalnie dodaje profil nowego pupila, edytuje dane profilu swojego czy pupila.

**Wymagania**

- Które elementy powinny ładować się jak najszybciej, jak to ważne?
    - Odpowiedź: Feed, profile i ogólnie multimedia i to dosyć wazne.
- Ilu użytkowników system powinien obsłużyć bez utraty wydajności?
    - Odpowiedź: Idealnie jak najwięcej, na pewno należy się przygotować na wielu i przygotować skalowalną architekturę.
- Na jakich urządzeniach ma działać witryna?
    - Odpowiedź: Smartfonach i komputerach osobistych, bo przechowywane są zazwyczaj zdjęcia, ale w ramach komputera osobistego będzie to przeglądarka, a w ramach smartfonu to będzie dedykowana aplikacja mobilna.
- Czy aplikacja ma działać dobrze na telefonie, tablecie i desktopie, czy któreś urządzenie ma być priorytetowe?
    - Odpowiedź: Przede wszystkim priorytet ma mieć smartfon i to w formie aplikacji mobilnej, przeglądarkowa raczej nakierunkowana będzie na desktop, ale jakąś responsywność powinna mieć.
- Czy są przypadki na które w kontekście wydajności system powinien szczególnie uważać?
    - Odpowiedź: Tak, musimy zaimplementować jakąś inteligentną kompresję i lazy-loading, aby feed działał płynnie nawet na spacerze w lesie, gdzie zasięg może być ograniczony oraz jakiś system stworzenia posta offline i uploadu go jak będzie interneto może okazać się przydatny bardzo.

**Administracja i zarządzanie platformą**

- Czy potrzebny będzie panel administracyjny?
    - Odpowiedź: Tak, ale bardziej dla moderatorów, aby mieli, gdzie zarządzać zgłoszeniami i usuwać treści, tagi czy inne nieodpowiednie elementy.
- Jakie działania moderator powinien móc dokładnie wykonywać?
    - Odpowiedź: Administrator musi móc usuwać posty, blokować konta, zarządzać tagami oraz weryfikować statusy profesjonalistów.
- Kto będzie rozpatrywał zgłoszenia użytkowników, czy będą to ludzie, czy wspierani algorytmami?
    - Odpowiedź: Początkowo będzie to dedykowany zespół wewnętrzny. Wraz ze wzrostem skali projektu, można by wdrożyć system zaufanych moderatorów wyłonionych spośród najbardziej aktywnych i pomocnych członków społeczności. Do tego automatycznie klasyfikować najbardziej oczywiste zgłoszenia pod nadzorem AI.

## 3.2 Ankieta badawcza

Na podstawie wywiadu przygotowano poniższą ankietę w celu rozstrzygnięcia spornych kwestii i sprawdzenia preferencji użytkowników na najważniejsze elementy projektu.

Sama ankieta została zrealizowana w Microsoft Forms, jest bardzo krótka, aby nie zniechęcać swoją długością. Składa się z najważniejszych 8 pytań i pola na uwagi od potencjalnych użytkowników. Wymagane były jedynie pytania 1., 2. oraz 3.

Pytania ankiety:

- Jak często szukasz w mediach społecznościowych treści związanych wyłącznie ze zwierzętami?

- Co najbardziej przeszkadza Ci w obecnych serwisach społecznościowych (np. Instagram, TikTok) podczas przeglądania treści o zwierzętach? (Zaznacz max 2)

- Czy czujesz potrzebę posiadania osobnej aplikacji dedykowanej wyłącznie Twojemu pupilowi i społeczności miłośników zwierząt?

- Jakie informacje o zwierzęciu chciałbyś widzieć na jego profilu? (Wielokrotny wybór)  
   <br/>
- Jaki sposób wyświetlania treści w głównym kanale (Feed) preferujesz?

- Jakich filtrów najczęściej używałbyś w sekcji "Odkrywaj"?

- Jakie kryterium weryfikacji profesjonalistów (weterynarzy, trenerów) byłoby dla Ciebie najbardziej wiarygodne?

- Jaki styl wizualny aplikacji najbardziej do Ciebie przemawia w kontekście zwierząt?

- Dodatkowe pole na wpisanie innych uwag

Ankieta została udostępniona znajomym, zwłaszcza grupom posiadających opiekunów zwierząt lub osoby inaczej z nimi związane, wypełniło ją 23 osoby, poniżej jej wyniki:

1\. Jak często szukasz w mediach społecznościowych treści związanych wyłącznie ze zwierzętami?

- Codziennie: 13 osób
- Kilka razy w tygodniu: 6 osób
- Raz na tydzień: 3 osoby
- Rzadziej: 1 osoba

2\. Co najbardziej przeszkadza Ci w obecnych serwisach społecznościowych podczas przeglądania treści o zwierzętach? (Max 2)

- Chaos w treściach (wszystko wymieszane ze stylem życia ludzi): 6 głosów
- Nadmiar reklam: 10 głosów
- Treści AI: 12 głosów
- Trudność w znalezieniu konkretnych ras/gatunków: 3 głosów
- Treści polityczne i agresywne dyskusje: 4 głosy

3\. Czy czujesz potrzebę posiadania osobnej aplikacji dedykowanej wyłącznie Twojemu pupilowi?

- Tak: 16 osób
- Nie: 3 osób
- Nie mam zdania: 4 osoby

4\. Jakie informacje o zwierzęciu chciałbyś widzieć na jego profilu? (Wielokrotny wybór)

- Imię: 20 głosy
- Rasa: 20 głosów
- Temperament: 18 głosów
- Upodobania: 15 głosów
- Data urodzenia: 19 głosów

5\. Jaki sposób wyświetlania treści w głównym kanale (Feed) preferujesz?

- Mieszany (najpierw nowości, potem polecane): 14 osób
- Tylko chronologiczny: 4 osób
- Całkowicie dopasowany do zainteresowań: 2 osoby

6\. Jakich filtrów najczęściej używałbyś w sekcji "Odkrywaj" umożliwiającej przeszukiwanie wszystkich treści aplikacji?

- Gatunek (pies, kot itp.): 20 głosów
- Konkretna rasa: 10 głosów
- Lokalizacja (zwierzęta w okolicy): 17 głosów
- Typ treści (wideo/zdjęcia): 7 głosów
- Inne: brak

7\. Jakie kryterium weryfikacji profesjonalistów byłoby najbardziej wiarygodne?

- System opinii i ocen od innych użytkowników (reputacja): 18 osób
- Płatny status „zweryfikowany": 1 osoba
- Inne:
    - Weryfikacja przez administratorów

8\. Jaki styl wizualny aplikacji najbardziej do Ciebie przemawia?

- Styl przytulny i dekoracyjny (ciepłe kolory, ilustracje): 9 osób (kojarzy się z opieką i emocjami)
- Nowoczesny minimalizm (czyste formy, biel/beż): 11 osób

9\. Jeśli masz jeszcze jakieś uwagi lub pomysły, proszę wpisz je w polu poniżej:

- "Brak"
- "Dodanie mapy miejsc spacerowych dla psów"
- "Fajnie byłoby mieć przypomnienia o szczepieniach"
- "Mapa miejsc do spacerowania ze zwierzętami byłaby fajna"

Wyniki przeprowadzonej ankiety jednoznacznie wskazują, że większość respondentów konsumuje treści związane ze zwierzętami codziennie i odczuwa silną potrzebę korzystania z dedykowanej im aplikacji, co jest zyskujące i zapewne wynika z trafienia ankietą dokładnie do grupy docelowej aplikacji. Co ciekawe, mimo, że aplikacji chciało 16 osób, to aż 20 osób odpowiedziało na wszystkie pytania, w tym te nieobowiązkowe, co może wskazywać na zaangażowanie w ankietę i pozytywne nastawienie użytkowników do projektu.

Omawiając kolejno odpowiedzi na każde pytanie:

- Użytkownicy korzystają często z mediów społecznościowych, przez co Petgram może się stać potencjalnie bardzo ważną aplikacją dla jego użytkowników.
- Co ciekawe, głównym problemem wskazanym przez użytkowników są treści AI, więc należy to uwzględnić i blokować takie treści jako nieodpowiednie, kolejną kwestią jest niestety nadmiar reklam, co pokazuje, że taki sposób na monetyzacje spowoduje niezadowolenie użytkowników.
- Co ciekawe, większość użytkowników chciałby takiej aplikacji, jednak może to być wynik uprzedzenia spowodowany małą grupą badawczą znającą twórców Petgram.
- Okazuje się, że uzytkownicy chcieliby widzieć wszystkie informacje, tak więc należałoby sformułować pytanie raczej jako "Jakie informacje o pupilu wypełnił(a)byś w jego profilu?"
- Zgodnie z założeniami mieszany petgram wydaje się atrakcyjny dla użytkowników.
- Niestety użytkownicy nie wskazali dodatkowych pomysłów na filtry, po których wyszukiwaliby informacje, dominują lokalizacja i gatunek.
- Kryterium weryfikacji specjalistów to tak jak wstępnie zakładano system opinii.
- Kwestia stylu wizualnego pozostaje nierozstrzygnięta, co może świadczyć o potrzebie balansowania między dekoracjami a minimalizmem.
- Uwag nie było wiele, ale ciekawym pomysłem jest dodanie mapy spacerowej i stworzenie z Petgram tym bardziej kompleksowej aplikacji, jednak nie sądzę, aby to był priorytet.

Głównym wnioskiem płynącym z badania jest konieczność pozycjonowania Petgram jako przestrzeni dla miłośników zwierząt wolnej nie tyle od innych treści, czy agresji i polityki, co od uciążliwych reklam i treści AI. Pod względem estetycznym należy dążyć do kompromisu między nowoczesnym minimalizmem a przytulnym charakterem witryny, wykorzystując stonowane kolory ziemi. Sugestie użytkowników dotyczące dodania map miejsc spacerowych oraz modułu przypomnień o szczepieniach stanowią bardzo wartościowy kierunek rozwoju na przyszłość.

## 3.3 Najważniejsze spostrzeżenia badawcze

Poniższe spostrzeżenia są wynikiem analizy zarówno wywiadu, jak i ankiet.

| **Obszar**                | **Spostrzeżenie**                                                                                      | **Synteza**                                                                                                                                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Strategia                 | Użytkownicy oczekują przestrzeni wolnej od treści generowanych przez AI, polityki i inwazyjnych reklam | Platforma musi kłaść silny nacisk na moderację treści AI oraz unikać formatów reklamowych zakłócających odbiór, aby spełnić obietnicę oazy spokoju.                                                               |
| Profil pupila             | Profil zwierzęcia jest ważnym elementem zachęcającym do korzystania z aplikacji                        | Użytkownicy chcą mieć szczegółowe dane takie jak rasa, temperament i data urodzenia. Funkcja ta ma lepiej porządkować wspomnienia niż standardowa galeria w telefonie.                                            |
| Profil pupila             | Profil pupila powinien zawierać możliwie niezmienne informacje.                                        | Struktura profilu zwierzęcia powinna uwzględniać dane stałe (data urodzenia, temperament), rezygnując z parametrów szybko zmiennych (waga, wiek), co ułatwi utrzymanie aktualności informacji przez użytkowników. |
| Profesjonaliści           | System opinii społecznościowych jest najbardziej wiarygodną metodą weryfikacji specjalistów            | Zamiast płatnych statusów, należy wdrożyć mechanizm ocen i reputacji, który pozwoli opiekunom bezpiecznie wybierać weterynarzy czy trenerów.                                                                      |
| Estetyka i design         | Tożsamość wizualna wymaga balansu między nowoczesnym minimalizmem a elementami przytulnymi             | Projekt graficzny powinien wykorzystywać stonowane kolory ziemi i przejrzysty układ, unikając przy tym zimnego, korporacyjnego charakteru.                                                                        |
| Interfejs i algorytmy     | Preferowany jest mieszany model wyświetlania treści w kanale głównym                                   | Feed powinien łączyć chronologiczne nowości od obserwowanych profili z algorytmem polecającym nowe, popularne treści dopasowane do zainteresowań.                                                                 |
| Wymagania techniczne      | Wysoka wydajność ładowania multimediów jest krytyczna dla powracalności użytkowników                   | Szybkość działania feedu i płynność odtwarzacza wideo bezpośrednio wpływają na sukces projektu, szczególnie w warunkach mobilnego dostępu do internetu.                                                           |
| Wyszukiwanie i odkrywanie | Lokalizacja i gatunek to najważniejsze parametry wyszukiwania treści                                   | Użytkownicy zapewne szukają informacji i innych opiekunów przede wszystkim w swojej najbliższej okolicy oraz w obrębie konkretnego gatunku zwierzęcia.                                                            |
| Rozwój funkcjonalny       | Istnieje zapotrzebowanie na funkcje wykraczające poza standardowe media społecznościowe                | Dodatki takie jak mapa miejsc spacerowych czy system przypomnień o szczepieniach są postrzegane jako wartościowe rozszerzenia kompleksowej opieki nad pupilem.                                                    |

# 4\. Specyfikacja funkcjonalna i niefunkcjonalna

Projekt zakłada implementację witryny internetowej spełniającej założenia platformy społecznościowej dla właścicieli zwierząt domowych. Zgodnie z tym, witryna zakłada posiadanie funkcji adekwatne witrynom konkurencyjnym - Instagram, Threads, Pixelfed, etc. Dodatkowo, przewiduje się funkcje unikalne związane z kontekstem informacyjnym witryny (np. klasyfikację postów względem gatunku/rasy zwierzęcia). Specyfikację podzielono na funkcje podstawowe (wynikające z charakteru witryny jako platformy społecznościowej) i dodatkowe (wynikające z kontekstu informacyjnego).

W ramach specyfikacji niefunkcjonalnej określa się przede wszystkim szybkość i lekkość działania aplikacji (wynikające z potrzeby jasnego oddzielenia się od "wielkich" platform społecznościowych), szybka i skuteczna moderacja postów pod względem treści niezgodnych z regulaminem, np. posty wykorzystujące modele określane ogólnie jako AI. Od strony UI określa się również m.in. łagodną, przyjazną kolorystykę i łatwy w nawigacji interfejs.

## 4.1. Specyfikacja funkcjonalna - funkcje podstawowe

Określa się następujące funkcje podstawowe w ramach specjalizacji funkcjonalnej:

- **Feed główny** - strona główna typu "vertical scroll":
    - **Kolejność postów** - nowe posty ukazywane w kolejności chronologicznej, mieszanej (treści chronologiczne przeplatane z algorytmicznie proponowanymi treściami) lub w trybie odkrywania (wyłącznie treści proponowane algorytmicznie); możliwość zamiany bezpośrednio z menu feedu głównego,
    - **Ukrywanie postów** - patrz pkt 4.c.ii,
    - **Przeglądanie postów:**
        - **Tryb danych komórkowych** - aplikacja powinna wykrywać lub dawać możliwość użytkownikowi ustawienia "trybu danych komórkowych", podczas którego zmniejszona jest jakość pobieranych przez użytkownika treści (zdjęć, filmów, etc.),
- **Wyszukiwarka** \- funkcjonalność wyszukiwania treści przez użytkowników:
    - **Wyszukiwanie bezpośrednie** - fragment tekstu,
    - **Wyszukiwanie po encjach** - możliwość wybrania encji, którą wyszukuje użytkownik (post, inny użytkownik, etc.),
- **Tworzenie postów** - tworzenie własnych treści w ramach witryny:
    - **Kreator postów**:
        - **Dodawanie opisu tekstowego** - wymagana obsługa standardu UNICODE,
        - **Dodawanie zdjęcia lub galerii zdjęć**,
        - **Dodawanie filmu lub galerii filmów**,
        - **Dodawanie tagów**,
        - **Oznaczanie użytkowników**,
    - **Ustawianie widoczności stworzonej treści** - prywatna, widoczna dla znajomych, widoczna dla znajomych (2 stopień), widoczna publicznie,
- **Interakcja z postami** - wchodzenie w interakcję z treściami wygenerowanymi przez innych użytkowników:
    - **Komentarz krótki** \- polubienie posta,
    - **Komentarz tekstowy:**
        - Wątki komentarzy,
        - Komentarz krótki (reakcja) dot. komentarza tekstowego,
        - Zgłoszenie komentarza tekstowego,
    - **Zapisanie posta do kolekcji** - użytkownik ma możliwość tworzenia prywatnych kolekcji postów ("zakładek"),
    - **Ukrycie posta:**
        - **Ukrycie konkretnego posta** (ręczna),
        - **Ukrycie postów na podstawie wzorców**:
            - Od konkretnej osoby
            - Na postawie frazy (_keywords_)
    - **Zgłoszenie posta** - treści niezgodne z regulaminem strony,
- **Interakcja z użytkownikami:**
    - **Tworzenie relacji** (obserwowanie):
        - Tworzenie relacji z użytkownikiem
        - Automatyczne podpowiadanie relacji na podstawie wzorców
    - **Feed osoby**:
        - Przeglądanie wszystkich postów danej osoby - kolejność chronologiczna
    - **Wyszukiwanie użytkowników,**
    - **Zgłoszenie użytkownika,**
- **Profil użytkownika**:
    - **Ustawianie informacji o użytkowniku**:
        - Zdjęcie profilowe,
        - Opis profilu,
        - Miejsce zamieszkania - opcjonalne,
    - Ustawianie posta przypiętego,
- **Powiadomienia:**
    - **Centrum powiadomień** - powiadomienia zgodnie z ustawieniami (patrz pkt 7)
    - **Powiadomienia dźwiękowe,**
- **Ustawienia:**
    - **Konfiguracja wyglądu strony:**
        - Konfiguracja języka interfejsu,
        - Konfiguracja koloru interfejsu - tryb jasny/ciemny,
    - **Konfiguracja systemowa:**
        - Ustawienia ukrywania postów innych użytkowników,
        - Ustawienia domyślnej widoczności postów użytkownika,
        - Usuwanie konta,
    - **Wartości domyślne** - automatyczne wykrywanie na postawie ustawień przeglądarki.
- **Funkcje dodatkowe:**
    - **Ostrzeżenia dot. nadmiernego przekazywania danych podczas dodawania danych identyfikujących** \- użytkownik może przekazać innym użytkownikom swoje zdjęcia, lokalizację, miejsca spacerowe, etc., co może poważnie wpływać na prywatność użytkownika

## 4.2. Specyfikacja funkcjonalna - funkcje dodatkowe

Określa się następujące funkcje podstawowe w ramach specjalizacji funkcjonalnej:

- \-
- **Wyszukiwarka**:
    - Wyszukiwanie dokładne (parametry zwierzęcia, etc.)
- **Tworzenie postów**:
    - **Kreator postów:**
        - Oznaczanie zwierzęcia jako uczestniczącego w aktywności
- **Interakcja z postami**:
    - **Ukrycie posta**:
        - **Ukrycie postów na podstawie wzorców:**
            - Dokładne - patrz pkt 2.a
- **Interakcja z użytkownikami:**
    - **Tworzenie relacji** (obserwowanie):
        - Tworzenie relacji ze zwierzęciem
- **Profil użytkownika**:
    - Podgląd zwierząt będących w opiece użytkownika,
    - **Profil zwierzęcia:**
        - **Ustawienie parametrów zwierzaków będących w opiece użytkownika**:
            - Zdjęcie reprezentatywne
            - Imię
            - Wiek - podawany jako data urodzenia, zgodnie z tabelką w 3.3
            - Gatunek
            - Rasa
            - Parametry dodatkowe (temperament, rodowód, ulubione jedzenie, ulubiona aktywność, etc.)
        - **Podgląd postów, w których pojawia się zwierzę**
- **Funkcje dodatkowe**:
    - **Mapa miejsc spacerowych** - konieczność obsługi formatu Google Maps/OpenStreetMap/inny
    - **System przypomnień o szczepieniach** - konieczność integracji z zewnętrznymi bazami zawierającymi regulacyjnie obowiązkowe i rekomendowane pakiety szczepień (wg kraju pobytu użytkownika)

## 4.3. Specyfikacja niefunkcjonalna

Określa się następujące cechy strony/aplikacji w ramach specyfikacji niefunkcjonalnej:

- **Działanie aplikacji:**
    - **Lekkość aplikacji** - aplikacja nie powinna zajmować dużo miejsca w pamięci operacyjnej oraz masowej,
    - **Szybkość aplikacji** - aplikacja powinna być szybka i responsywna, szczególnie na słabszych urządzeniach (telefonach),
    - **Dostępność aplikacji** - aplikacja powinna być dostępna na jak największej liczbie rynków (tj. krajów),
- **Interfejs**:
    - **Kolorystyka** - kolorystyka interfejsu powinna być przyjazna i ciepła,
    - **Minimalizm** - elementy języka designu powinny być zaprojektowane minimalistycznie,
- **UX:**
    - **Moderacja:**
        - **Szybka/natychmiastowa moderacja** - moderacja postów/użytkowników pod względem treści niezgodnych z regulaminem strony powinna przebiegać w sposób możliwie natychmiastowy,
        - **Jasna komunikacja dot. treści usuniętych w ramach procesu moderacji** - witryna powinna jasno określić użytkownikowi, którego treści zostały usunięte, z jakiego powodu zostały usunięte oraz o możliwej dla użytkownika ścieżce apelacji,
    - **Intuicyjny interfejs** - architektura informacji przedstawiana w sposób intuicyjny dla przeciętnego użytkownika (zgodnie z pktem głównym 3.)
    - **Trafny algorytm w trybie mieszanym/odkrywania feedu głównego -** algorytm powinien trafnie przewidywać treści, które może polubić użytkownik:
        - **Brak promocji treści "sensacyjnych"** - algorytm nie powinien promować treści wyłącznie na podstawie zaangażowania użytkowników (e.g. komentarze krótkie/tekstowe),
        - **Uwzględnienie postów/użytkowników ukrytych** - algorytm powinien brać pod uwagę treści ukryte przez użytkownika i nie promować podobnych do nich treści,
        - **Uwzględnienie częstotliwości ukrycia postów/użytkowników przez innych użytkowników** - algorytm powinien brać pod uwagę częstotliwość, z którą użytkownicy trafiający na dane treści decydują się na ich ukrycie i odpowiednio ograniczać promocję takich treści,
        - **Uwzględnienie miejsca zamieszkania użytkownika** - algorytm powinien brać pod uwagę miejsce zamieszkania użytkownika (jeśli zostało przez niego podane).

# 5\. Schemat funkcjonalny i architektura informacji

(opis wygenerowany AI, może zawierać błędy)

**1\. Authentication & Account Management**

This module handles the entry points and security of the application.

- **Information Architecture:**
    - **Login Page:** Entry point for existing users.
    - **Registration Form:** Data collection for new users.
    - **Password Reset:** Multi-step flow involving email verification and new password entry.
- **Key Functions:**
    - zalogujUzytkownika(): Authenticates the user.
    - zarejestrujDaneFormularza(): Processes new account creation.
    - zresetujHaslo(): Initiates the recovery process.
    - wpiszNoweHaslo(): Finalizes the password change.
- **Relations:** Success in login or registration leads to the **Main Page**. Failure loops back to the respective forms.

**2\. Navigation & Core Interface**

The central hub that connects all functional modules.

- **Information Architecture:**
    - **Main Page:** The landing interface after login.
    - **View Selection Menu:** The primary navigation sidebar/header.
- **Key Functions:**
    - logoStrony(): Returns user to the home view.
    - menuWyboruWidoku(): Directs the user to the Feed, Search, Creator, or Profile.

**3\. Post Feed & Interaction**

Handles the display and consumption of content.

- **Information Architecture:**
    - **Main Feed:** The primary stream of posts.
    - **Post Menu:** Contextual options for single posts.
    - **Comments Menu:** Threaded replies.
    - **Report/Hide Menu:** Content moderation tools.
- **Key Functions:**
    - zmienTrybWyswietlaniaPostow(): Toggles how posts are filtered/sorted.
    - zostawKomentarz() / zostawReakcje(): Standard engagement tools.
    - edytujPost() / usunPost(): Owner-specific management (Owner Menu).
    - ukryjWszystkiePostyOdAutora(): User preference filtering.

**4\. Search Engine (Wyszukiwarka)**

A specialized module for finding content and profiles.

- **Information Architecture:**
    - **Search Bar:** Direct text input.
    - **Categorized Search:** Dedicated views for **Posts**, **Users**, and **Pets** (specifically "Rare Breeds").
    - **Short Profile View:** Preview cards for search results including name, species, and photo.
- **Key Functions:**
    - wybierzCoChceszWyszukac(): Filters search by category.
    - wyszukiwanieBezposrednie(): Executes real-time text search.
    - menuZnalezionychDanych(): Contextual actions for search results.

**5\. Post Creator**

The interface for generating new content.

- **Information Architecture:**
    - **Creation Menu:** The workspace for drafting.
    - **Content Warning:** A mandatory modal for sensitive information.
- **Key Functions:**
    - dodajTytul() / dodajOpis(): Metadata entry.
    - oznaczUczestnikow(): Tagging other users or pets.
    - dodajMultimedia(): Uploading images/videos.
    - opublikujPost(): Final submission to the database.

**6\. User & Pet Profiles**

Personalized data hubs for users and their animals.

- **Information Architecture:**
    - **User Profile View:** Displays user-specific posts and parameters.
    - **Pet Profile:** A sub-profile linked to the user.
    - **Animal Parameters View:** Detailed info (Race, Age, Temperament).
- **Key Functions:**
    - wyswietlParametryUzytkownika(): Loads biographical data.
    - menuPostowUzytkownika(): Filters the feed to only show that user's content.

**7\. Settings (Ustawienia)**

Customization and account maintenance.

- **Information Architecture:**
    - **Appearance Settings:** UI/UX customization.
    - **System Settings:** Core account security and data management.
- **Key Functions:**
    - ustawJezykInterfejsu() / ustawKolorInterfejsu(): Visual preferences.
    - zmienHaslo() / usunKonto(): Account security actions.
    - zmienDomyslnaWidocznosc(): Privacy defaults for future posts.

**Logical Summary of Relations**

The **Main Page** acts as the controller. From here, the user branches into **Creation** (output), **Search** (discovery), or the **Feed** (consumption). The **Profile** serves as the anchor point, linking back to individual posts in the feed and connecting to **Settings** for global application behavior.

# 6\. Szkic projektu graficznego

## 6.1. Schemat formalny kompozycji

Schemat formalny kompozycji dla Petgram oparto na założeniu, że aplikacja ma być przede wszystkim czytelna i nie przeładowana nie potrzebnymi informacjami. Z tego względu wybrano układ bazujący na prostym systemie kart, dużych odstępach między sekcjami oraz wyraźnym podziale treści na moduły.

Na desktopie przyjęto szeroki margines boczny i wyraźne osadzenie głównej kolumny treści w centrum. Dzięki temu interfejs nie sprawia wrażenia rozciągniętego ani przeładowanego, oraz naturalnie skaluje się do mobilnych ekranów.

W celu uzyskania przyjaznego i nowoczesnego interfejsu wykorzystano duże zaokrąglenie narożników sekcji oraz kart we wszystkich widokach aplikacji. Największą wagę wizualną mają zdjęcia, kafle treści oraz nagłówki sekcji, dlatego elementy drugorzędne, takie jak tagi, metadane czy ikony, zostały utrzymane w mniejszej skali i stonowanej kolorystyce.

## 6.2. Układ kompozycyjny

Podstawą układu w wersji desktopowej jest górna nawigacja prowadząca do najważniejszych sekcji aplikacji: Feed, Explore, Add, Messages oraz Profile. Taki układ pozwala użytkownikowi szybko odnaleźć potrzebne miejsce, a przy tym zostawia więcej przestrzeni pionowej na prezentację treści. Logo umieszczone po lewej stronie domyka kompozycję i pomaga budować rozpoznawalność marki. Jego umieszczenie ma przypominać zakładkę książki, co ma uwydatniać osobisty charakter aplikacji. Poniżej przedstawiono i opisano najważniejsze widoki zaprojektowane zgodnie z przeprowadzonym wywiadem z pomysłodawcą projektu oraz uzyskanymi wynikami ankiety.

W przypadku strony Feed przyjęto układ pojedynczej, wyśrodkowanej kolumny z kolejnymi kartami postów wyświetlanych jako infinite scroll. Jest to świadome nawiązanie do modeli znanych z serwisów społecznościowych, co jest również oczekiwanym przez użytkownika zachowaniem. Pojedynczy post otrzymuje dużą powierzchnię, aby zdjęcie lub materiał wizualny mogły pełnić rolę głównego nośnika treści. Nad danym zdjęciem znajdują się podstawowe dane identyfikujące profil zwierzęcia oraz datę dodania zdjęcia, a pod nim możliwe do wykonania działania społecznościowe i opis autora.

Strona Explore otrzymała natomiast odmienny układ kompozycyjny, ponieważ jej zadaniem nie jest konsumpcja jednego posta na raz, lecz przeglądanie i odkrywanie treści. Z tego powodu zastosowano układ siatki o liczbie trzech kolumn, który dla mniejszych ekranów może maksymalnie zmniejszyć się do dwóch, aby nadal wizualnie odbiegać od sekcji Feed. W górnej części znajduje się szeroki panel wyszukiwania z polem tekstowym i filtrami, a poniżej siatka zdjęć. Istnieje również możliwość wyświetlenia pozostałych filtrów, które nie zostały zaproponowane. Rozwiązanie pozwala użytkownikowi najpierw zawęzić obszar zainteresowania, a następnie intuicyjnie przeglądać wyniki. U dołu, pod wyświetlonymi wynikami znajduje się wizualny znacznik, który sugeruje, że kolejne treści zostaną załadowane po przesunięciu widoku w pełni na dół strony.

Kompozycja profilu zwierzęcia została podzielona na kilka wyraźnych stref. W górnej części znajduje się główna karta profilu zawierająca zdjęcie profilowe, nazwę zwierzęcia, informacje o właścicielu, oznaczenia typu rasy i cech charakteru pod postacią tagów oraz krótki opis. W prawym górnym rogu znajduje się wyróżniony poprzez gradient przycisk obserwowania profilu oraz opcja udostępnienia go. Poniżej znajdują się oddzielne sekcje informacyjne, zawierające informacje takie jak temperament, ulubione aktywności czy data urodzenia. Zastosowanie osobnych kart dla tych informacji poprawia czytelność i sprawia, że ilość informacji nie przytłacza użytkownika.

Dalsza część profilu zawiera blok statystyk oraz galerię zdjęć. Statystyki zostały ujęte w jednym poziomym module, co pozwala szybko odczytać skalę aktywności bez rozbijania uwagi na wiele osobnych wskaźników. Sekcja galerii została natomiast oparta na dużych kaflach ze zdjęciami, aby zachować wizualne pierwszeństwo wspomnień i publikowanych treści. Dzięki temu profil zwierzęcia spełnia podwójną funkcję: jest zarówno miejscem społecznościowej obecności pupila, jak i estetycznie uporządkowanym archiwum materiałów.

## 6.3. Schemat kolorów

Schemat kolorystyczny został opracowany w taki sposób, aby był przyjazny dla użytkownika i odciągał go od treści. Zrezygnowano z barw zimnych, zamiast tego przyjęto paletę inspirowaną naturalnymi i niekrzykliwymi tonami, uzupełniając ją pastelowymi akcentami.

Kolorem tła został ciepły odcień bieli. Jest to barwa bardzo jasna, ale nie sterylna i nie laboratoryjna. Jej zadaniem jest stworzenie przyjaznego pola dla wszystkich elementów interfejsu.

Kolorem bazowym marki i głównych akcentów został brąz. Pełni on funkcję koloru identyfikacyjnego i jest stosowany w elementach takich jak zakładki nawigacyjne czy przyciski.

Do wyróżniania sekcji i budowania głębi widoków zastosowano dwa dodatkowe kolory tła modułów. Pierwszy z nich ma lekko beżowy charakter, drugi jest bliższy neutralnej szarości złamanej ciepłem. Ich rola nie polega na mocnym kontrastowaniu, lecz na delikatnym oddzielaniu kart, paneli informacyjnych i obszarów funkcyjnych od tła głównego.

Kolory tagów i akcentów dobrano tak, aby wnosiły do interfejsu większą różnorodność, ale nadal pozostawały spójne z ciepłym charakterem aplikacji. Zastosowano tu barwy miękkie, lekko przygaszone i przyjazne w odbiorze. Służą one do oznaczania cech zwierzęcia, kategorii treści, statusów i tagów opisowych. Zamiast krzykliwych odcieni użyto tonów przypominających ciepły koral, pastelową morelę, jasny róż i zgaszoną zieleń.

Warstwa tekstowa została oparta na trzech odcieniach. Najciemniejszy z nich służy do nagłówków i informacji priorytetowych, środkowy do treści regularnych, a najjaśniejszy do danych pomocniczych i metadanych. Taki stopniowany system wspiera hierarchię informacji i pozwala ograniczyć konieczność używania wielu wag pisma czy dodatkowych ozdobników. Tekst pozostaje czytelny, ale nie jest wizualnie zbyt ciężki.

Uzupełnieniem palety jest skala neutralnych szarości. Barwy te zostały przeznaczone dla pól wejściowych, pustych stanów, ikon pomocniczych, separatorów oraz technicznych elementów interfejsu. Ich zadaniem jest wzmacnianie porządku.

Całościowo schemat kolorów Petgram można uznać za stonowany i naturalny. Nie służy on przyciąganiu uwagi za wszelką cenę, lecz tworzeniu środowiska, w którym użytkownik może komfortowo oglądać i publikować treści związane ze zwierzętami.

Poniżej znajduje się opisana powyżej paleta barw razem z kodami poszczególnych kolorów:
**Kolor tła (Background Color)**

- **FAF9F6**

**Kolor bazowy (Base Color)**

- **7D5739**

**Dodatkowe wyróżniające kolory sekcji (Additional Section Colors)**

- **F0EDE8**
- **F4F4F0**

**Kolory tagów oraz akcentów (Tag and Accent Colors)**

- **FF8887**
- **FECAA5**
- **FEAEA5**
- **C8F17A**

**Kolory tekstu (Text Colors)**

- **303330**
- **5D605C**
- **78716C**

**Skala szarości (Grayscale)**

- **FFFFFF**
- **F4F4F0**
- **DCDCDC**

## 6.4.Projekty kluczowych grafik i ornamentów

W projekcie przyjęto zasadę, że warstwa graficzna nie powinna dominować nad publikowanymi treściami, lecz wspierać tożsamość marki i porządkować interfejs. Z tego względu system kluczowych grafik i ornamentów został zaprojektowany w sposób oszczędny, bez nadmiernej dekoracyjności.

Najważniejszym elementem identyfikacji wizualnej jest logotyp. Jego forma pisana, o delikatnej odręcznej charakterystyce, ma na celu komunikować osobisty wymiar aplikacji. Dzięki temu marka nie kojarzy się z chłodnym narzędziem społecznościowym. Logotyp w swojej pierwotnej wersji został urozmaicony tak, aby wizualnie przypominał oczy zwierzęcia, co w subtelny sposób nawiązuje do tematyki projektu.

W obrębie profilu zwierzęcia przyjęto zastosowanie okrągłych i kapsułowych form pomocniczych, takich jak badge. Elementy te nie są ozdobą w sensie czysto dekoracyjnym, lecz wizualnym narzędziem porządkowania cech zwierzęcia lub statusów. Przykładem takiego rozwiązania jest okrągły badge z motywem łapy umieszczony przy zdjęciu profilowym, pełniący funkcję wyróżnienia społecznościowego. Oznacza on profil aktywny, rozpoznawalny lub pozytywnie odbierany przez użytkowników aplikacji. Przykładowe znaczniki przestawiono poniżej.

## 7. Protokół różnic między implementacją, a projektem

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
