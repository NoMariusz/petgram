| Zaawansowane Techniki Programowania |

| ----------------------------------- |

| Dokumentacja projektu „Petgram" |

| 2026 |

\# 1\\. Wstęp i założenia projektu

\## 1.1. Cel i przedmiot projektu

Dokument opisuje założenia i realizację platformy społecznościowej Petgram. Głównym celem projektu jest stworzenie dużej, wyspecjalizowanej bazy treści wizualnych skupionej wyłącznie na zwierzętach, która będzie wolna od chaosu informacyjnego typowego dla ogólnotematycznych portali. Docelowo Petgram miałby się stać pierwszą aplikacją wyboru dla każdego, kto szuka spokojnego medium społecznościowego i jest miłośnikiem zwierząt, lub chce dokumentować chwile ze swoimi pupilami w jednym dedykowanym do tego miejscu.

System umożliwia właścicielom dokumentowanie rozwoju swoich podopiecznych. Jednocześnie dostarcza on narzędzi dla profesjonalistów z branży zoologicznej do komunikacji z potencjalnymi klientami. Z punktu widzenia projektowego platforma stanowi wyspecjalizowaną bazę danych wizualnych, posiadającą dedykowane mechanizmy filtrowania i kategoryzacji opartych na parametrach zwierząt.

\## 1.2. Identyfikacja problemu

Obecnie użytkownicy mediów społecznościowych czują się przytłoczeni nadmiarem agresywnych treści, polityki i reklam, co utrudnia szybkie dotarcie do kojących materiałów ze zwierzętami. Aplikacja eliminuje także trudności związane z organizacją cyfrowych wspomnień o zwierzętach, które często giną w galeriach telefonów lub na przeładowanych profilach osobistych.

\## 1.3. Grupy docelowe

Głównymi odbiorcami są właściciele psów, kotów, lub nawet koni i zwierząt egzotycznych, którzy traktują swoich podopiecznych jak członków rodziny i chcą dokumentować ich rozwój. Platforma przyciągnie także młodsze pokolenia użytkowników przyzwyczajone do formatu krótkich filmów wideo i dynamicznej konsumpcji treści. Kolejną grupą są profesjonaliści, tacy jak behawioryści, weterynarze czy trenerzy, szukający przestrzeni do budowania marki osobistej w odpowiednim kontekście. Ostatnią istotną grupą są osoby planujące posiadanie własnych zwierząt, aby szukać treści i informacji o potencjalnym gatunku lub rasy pupila.

\## 1.4. Założenia wynikające z badań

Proces badawczy obejmujący wywiad z pomysłodawcą oraz ankietyzację potencjalnych użytkowników pozwolił na zdefiniowanie kluczowych cech systemu. Przykładowe wnioski:

\- Architektura informacji zakłada separację profilu użytkownika od profili jego podopiecznych.

\- Profil zwierzęcia musi gromadzić dane stałe, takie jak data urodzenia czy temperament, z pominięciem parametrów podlegających ciągłym zmianom.

\- Wyświetlanie treści w głównym kanale oparto na modelu mieszanym. Łączy on chronologiczne publikacje od obserwowanych kont z postami dobieranymi przez algorytm rekomendacyjny.

\- Zrezygnowano z płatnych metod weryfikacji specjalistów na rzecz mechanizmu opinii społecznościowych, uznanego przez respondentów za cechę decydującą o wiarygodności.

\- W module wyszukiwania priorytet nadano parametrom lokalizacji oraz precyzyjnej klasyfikacji gatunkowej.

\# 2\\. Architektura i wykorzystane technologie

\## 2.1. Ogólna architektura systemu

Aplikacja została zaprojektowana w oparciu o klasyczną architekturę \*\*klient-serwer\*\*. Warstwa prezentacji uruchamiana w przeglądarce użytkownika komunikuje się z warstwą logiki biznesowej za pomocą \*\*API w stylu Rest\*\* komunikujące się poprzez wiadomości w formacie JSON. Rozdzielenie tych środowisk pozwala na niezależne wdrażanie, testowanie i rozwijanie obu komponentów bez ingerencji w cały system.

\## 2.2. Warstwa kliencka (Frontend)

Interfejs użytkownika zrealizowano jako aplikację typu \*\*Single Page Application\*\*. Do jej budowy wykorzystano bibliotekę \*\*React\*\*. Zarządzanie procesem budowania aplikacji oraz serwowania plików w środowisku deweloperskim oparto na narzędziu Vite, co optymalizuje czas kompilacji kodu. Logikę nawigacji pomiędzy poszczególnymi widokami obsługuje biblioteka \*\*React Router\*\*.

Kod warstwy klienckiej napisano z użyciem języka \*\*TypeScript\*\*, wprowadzającego mechanizm statycznego typowania. Zastosowanie tego rozwiązania eliminuje znaczną część błędów już na etapie pisania kodu i poprawia jego spójność strukturalną. Stylizację komponentów oparto na bibliotece \*\*TailwindCSS\*\*. Pozwala ona na definiowanie wyglądu elementów za pomocą klas użytkowych implementowanych w plikach widoków. Podejście to ułatwia zachowanie spójności wizualnej i stworzenie \*\*responsywnego układu\*\*, który skaluje się w zależności od rozdzielczości ekranu.

\## 2.3. Warstwa serwerowa (Backend)

Logika biznesowa systemu została zaimplementowana w języku \*\*Java\*\* w wersji 17. Jako główny szkielet aplikacji wykorzystano framework \*\*Spring Boot\*\*. Wybór tego rozwiązania automatyzuje proces konfiguracji środowiska webowego i udostępnia wbudowane mechanizmy do wstrzykiwania zależności oraz obsługi żądań protokołu HTTP. Zarządzanie zależnościami projektowymi i procesem kompilacji aplikacji serwerowej realizowane jest za pomocą narzędzia \*\*Gradle\*\*.

Mechanizm uwierzytelniania użytkowników oraz autoryzacji zapytań do serwera oparto na technologii \*\*JWT\*\*. Tokeny weryfikują tożsamość klienta przy każdej operacji wymagającej uprawnień. Zmienne środowiskowe oraz parametry konfiguracyjne, w tym czas wygasania sesji i klucze szyfrujące, zdefiniowano w plikach właściwości systemu.

\## 2.4. Baza danych i persystencja

W projekcie zastosowano relacyjną bazę danych \*\*SQLite\*\*, która przechowuje struktury danych w lokalnym pliku. Zdecydowano się na wybór tej bazy już od samego początku projektu zamiast domyślnej bazy ponieważ silnik ten nie wymaga konfiguracji oddzielnego serwera procesów bazodanowych, co upraszcza proces uruchamiania oprogramowania, a jednocześnie zapewnia przetrwanie danych pomiędzy uruchomieniami aplikacji. Komunikacja warstwy serwerowej z bazą odbywa się za pośrednictwem specyfikacji mapowania obiektowo-relacyjnego z wykorzystaniem narzędzia \*\*Hibernate\*\*. Mapuje ono obiekty języka programowania bezpośrednio na tabele bazy danych. Dodatkowo pozwala ono na łatwą migrację z aktualnej bazy danych \*\*SQLite\*\* na docelowe rozwiązanie odpowiednie dla dużych wolumenów danych takie jak np. \*\*PostgreSQL\*\*.

W celu usprawnienia prac programistycznych i weryfikacji interfejsu zaimplementowano moduł o nazwie DatabaseSeeder. Przy każdym uruchomieniu pustej bazy danych mechanizm ten uzupełnia tabele początkowym zestawem przykładowych informacji. Umożliwia to natychmiastowe testowanie funkcji społecznościowych bez konieczności ręcznego wprowadzania danych.

\## 2.5. Infrastruktura i konteneryzacja

Proces wdrażania oraz uruchamiania aplikacji ujednolicono dzięki wykorzystaniu technologii \*\*Docker\*\*. Dla warstwy klienckiej i serwerowej przygotowano dedykowane pliki konfiguracyjne, które definiują środowiska uruchomieniowe od poziomu systemu operacyjnego wzwyż. Zbudowane obrazy zawierają kod źródłowy oraz wszystkie pakiety niezbędne do funkcjonowania aplikacji.

Orkiestrację uruchomionych kontenerów realizuje narzędzie \*\*Docker Compose\*\*. W utworzonych plikach konfiguracyjnych zdefiniowano parametry usług, zmapowano odpowiednie porty sieciowe na maszynę hosta oraz przypisano wolumeny chroniące plik bazy danych przed usunięciem w przypadku restartu kontenera. Usługi komunikują się ze sobą poprzez izolowaną, wewnętrzną sieć wirtualną.

\## 2.6. Narzędzia projektowe, testowe i analityczne

Wczesne etapy planowania architektury informacji oraz interfejsu graficznego przeprowadzono w oprogramowaniu \*\*Figma\*\*. Przygotowano w nim interaktywne makiety wszystkich widoków, które posłużyły jako wzór podczas prac nad warstwą frontendową. Po stronie serwerowej zadbano o niezawodność logiki biznesowej poprzez implementację dedykowanych testów dla głównych domen aplikacji. Testy te weryfikują zachowanie poszczególnych modułów, minimalizując ryzyko regresji kodu.

Dla potrzeb monitorowania ruchu sieciowego i wydajności interfejsu do aplikacji klienckiej zintegrowano systemy analityczne. Wykorzystano bibliotekę \*\*React-GA4\*\* do komunikacji z platformą \*\*Google Analytics\*\* w celu agregowania danych ilościowych. Dodatkowo wdrożono oprogramowanie \*\*Hotjar\*\*, które umożliwia analizę jakościową zachowań użytkowników poprzez generowanie map interakcji na poszczególnych ekranach.

\# 3\\. Projekt i schematy systemu

\## 3.1. Omówienie struktury kodu źródłowego aplikacji

\### 3.1.1. Diagram UML klas aplikacji backendowej

Aplikacja serwerowa opiera się na architekturze wielowarstwowej, typowej dla interfejsów programistycznych w języku Java. Kod został zorganizowany w warstwę kontrolerów odbierających żądania, warstwę serwisów przetwarzających reguły biznesowe oraz warstwę dostępu do danych komunikującą się bezpośrednio z bazą.

Główne domeny systemu to użytkownik (Users), profil zwierzęcia (Pets), oraz posty (Posts). Poza nimi występują również pomocnicze w ramach konkeretnych mechanizmów, np. domena uwierzytelniania (Auth), czy przechowywania plików (FileStorage).

Ze względu na zbyt duży poziom rozbudowania aplikacji nie zostanie przytoczony jeden pełny kompletny diagram klas UML prezentujący działanie aplikacji, jednak za przykład zależności między klasami i mechanizmami w ramach konkretnej domeny może posłużyć poniższy diagram UML klas domeny Users:

Poniżej przedstawiono zestawienie zakresu odpowiedzialności poszczególnych warstw i pakietów w kodzie aplikacji backendowej:

\- controller: Warstwa interfejsu API odpowiedzialna za przyjmowanie żądań HTTP od klienta, ich wstępną walidację oraz zwracanie odpowiednich odpowiedzi. Stanowi punkt wejścia do aplikacji, który przekierowuje przepływ sterowania do odpowiednich serwisów logiki biznesowej.

\- dto: Obiekty transferu danych wykorzystywane do odbierania i mapowania informacji przesyłanych przez klienta w żądaniach wejściowych. Służą do hermetyzacji danych, takich jak formularze rejestracji czy logowania, przed przekazaniem ich w głąb systemu.

\- entity: Modele danych odzwierciedlające strukturę tabel w relacyjnej bazie danych za pomocą mechanizmów mapowania obiektowo-relacyjnego. Przechowują stan obiektów i definiują powiązania referencyjne między nimi, na przykład relacje między użytkownikiem a jego postami.

\- repository: Interfejsy komunikujące się bezpośrednio z bazą danych przy wykorzystaniu mechanizmów frameworka Spring Data JPA. Odpowiadają za wykonywanie podstawowych operacji zapisu i odczytu oraz definiowanie niestandardowych zapytań bazodanowych.

\- service: Warstwa logiki biznesowej, w której przetwarzane są główne reguły i procesy oprogramowania, takie jak bezpieczne uwierzytelnianie czy mechanizmy obserwowania użytkowników. Pośredniczy między kontrolerami a repozytoriami, orkiestrując przepływ danych w systemie.

\- store: Moduł odpowiedzialny za niskopoziomową konfigurację mechanizmów persystencji oraz inicjalizację bazy danych. Zawiera klasy ustawiające źródło danych i specyficzne dialekty, a także skrypty zasilające bazę początkowym zestawem przykładowych informacji testowych.

\- view: Zestaw niemutowalnych obiektów pełniących rolę formatki dla danych wyjściowych wysyłanych jako odpowiedź serwera do aplikacji klienckiej. Oddzielają one wewnętrzny model bazy danych od informacji, które faktycznie i bezpiecznie można udostępnić na zewnątrz.

\### 3.1.2. Omówienie struktury aplikacji frontendowej

Struktura plików warstwy klienckiej organizuje kod na podstawie mechanizmów trasowania widoków oraz współdzielonych mechanizmów. Rozdziela ona pliki konfiguracyjne środowiska od komponentów interfejsu odpowiadających za konkretne ekrany. Główny punkt startowy ładuje globalne arkusze stylów i inicjalizuje niezbędne skrypty w tle. Definicje dostępnych adresów sieciowych zgrupowano w dedykowanym pliku, który mapuje je na moduły odpowiedzialne za renderowanie odpowiednich struktur wizualnych.

Poniższe zestawienie prezentuje strukturę katalogów i najważniejszych plików warstwy klienckiej. Ułatwia ona separację logiki nawigacji, właściwego kodu UI oraz reużywalnej logiki od siebie.

\- package.json - Plik definiujący zależności projektu, skrypty budujące oraz wersje wykorzystywanych bibliotek, w tym środowiska uruchomieniowego i narzędzi stylizujących.

\- Katalog app - Zawiera właściwy kod źródłowy aplikacji, katalog domowy zawiera przede wszystkim rozmaite skrypty konfiguracyjne.

&#x20; - root.tsx - Główny plik układu aplikacji definiujący podstawową strukturę dokumentu, ładujący globalne arkusze stylów oraz inicjalizujący mechanizmy śledzenia ruchu sieciowego.

&#x20; - routes.ts - Plik konfiguracyjny zawierający definicje wszystkich ścieżek URL i mapowanie ich na odpowiednie pliki renderujące interfejs użytkownika.

&#x20; - app.css - Globalny arkusz stylów wykorzystujący importujący TailwindCSS i definiujący globalne style CSS.

&#x20; - Katalog utils - Miejsce przechowywania reużywalnych funkcji np. formatowania daty.

&#x20; - Katalog components - Przestrzeń przeznaczona na moduły interfejsu użytkownika wielokrotnego użytku, możliwe do zastosowania w różnych miejscach systemu.

&#x20; - Katalog shared - Podkatalog zawierający elementy współdzielone między wieloma domenami, np. LoggedContainer.tsx

&#x20; - Katalogi domenowe np. posts, pets - Komponenty wykorzystywane przez konkretną domenę, lub z nią powiązane są zgrupowane w odpowiednim katalogu.

&#x20; - Katalog data - Przestrzeń przechowująca mechanizmy związane z danymi zarówno zewnętrznymi jak i stałymi w aplikacji.

&#x20; - types.d.ts - Plik przechowujący globalne typy używane pomiędzy domenami.

&#x20; - api.ts - Moduł z reużywalnymi metodami zdobywającymi dane z API.

&#x20; - analytics.ts - Plik odpowiedzialny za inicjalizację usługi oraz przesyłanie zebranych zdarzeń do narzędzi analizy statystycznej.

&#x20; - hotjar.ts - Plik konfigurujący mapowanie interakcji użytkowników na poszczególnych ekranach celem późniejszej weryfikacji punktów styku.

&#x20; - constants.ts - Plik przechowujący stałe globalne.

&#x20; - Katalog routes - Przestrzeń strukturyzująca pliki poszczególnych widoków ekranów zgodnie z ustaloną logiką nawigacji systemowej.

&#x20; - home.tsx - Plik definiujący strukturę początkowego ekranu powitalnego dla niezalogowanych użytkowników.

&#x20; - not-found.tsx - Plik strony 404.

&#x20; - Katalog posts - Podkatalog grupujący widoki odpowiedzialne za proces przeglądania i tworzenia treści wizualnych.

&#x20; - feed.tsx - Widok głównego strumienia informacji obsługujący ułożenie pionowe obrazów oraz ich renderowanie.

&#x20; - explore.tsx - Widok modułu wyszukiwania i filtrowania udostępnionych zewnętrznie treści ze zwierzętami.

&#x20; - createPost.tsx - Widok interfejsu pozwalającego na przesyłanie nowych plików i dodawanie opisów przed ich publikacją.

&#x20; - post.tsx - Komponent odpowiedzialny za widok pojedynczego posta.

&#x20; - Katalog users - Podkatalog grupujący widoki związane z procesami uwierzytelniania i operowania tożsamością w systemie.

&#x20; - Katalog pets - Podkatalog grupujący widok dotyczące domenę pupili.

Wydzielenie integracji z zewnętrznymi skryptami analitycznymi oraz elementów współdzielonych do osobnych przestrzeni eliminuje problem powielania tych samych bloków kodu. Ułatwia to przyszły proces testowania poszczególnych komponentów interfejsu i znacząco redukuje czas potrzebny na wprowadzanie modyfikacji czy usuwanie błędów w przyszłości.

\## 3.2. Diagram ERD bazy danych

Warstwa persystencji w bazie relacyjnej odzwierciedla układ domenowy narzucony przez aplikację serwerową. System przechowuje znormalizowane struktury obiektów wykorzystując system kluczy podstawowych oraz obcych w celu zachowania integralności referencyjnej.

Dokładne relacje między danymi można zaobserwować na poniższym diagramie ERD:

\## 3.3. Diagram przypadków użycia

Wymagania systemowe pozwoliły na wyróżnienie trzech ról przypisanych do aktorów korzystających z platformy. Każda ze ścieżek dostępu ogranicza widoczność funkcji względem uprawnień danego konta.

Niezalogowany użytkownik dysponuje najmniejszym zestawem akcji. Może wyświetlić jedynie ekran wejściowy, zalogować się do istniejącego konta lub wywołać procedurę rejestracji. Uwierzytelnienie podnosi uprawnienia aktora do statusu zalogowanego opiekuna.

Zalogowany opiekun ma dostęp do głównych funkcjonalności systemu, natomiast trzecim zidentyfikowanym aktorem jest moderator. Posiada on wszystkie uprawnienia opiekuna, uzupełnione będą one w przyszłości o możliwość usuwania materiałów oraz zarządzania widocznością profili zgłaszanych jako naruszające zasady witryny.

\# 4\\. Działanie i funkcjonalności systemu

\## 4.1. Prezentacja działania systemu

Pierwotnym miejscem prezentującym działanie systemu była interaktywna makieta wykonana w aplikacji Figma Design dostępna pod linkiem: <https://www.figma.com/proto/h89H6nvuK3eFdUa4CjpQzj/petgram?node-id=86-749\&t=tAeC9grn16L5tkVu-1>

Aktualne możliwości i wygląd aplikacji są bardziej rozbudowane niż na wczesnej makiecie, zakres aktualnej aplikacji prezentuje poniższa mapa strony i funkcji:

\## 4.2. Realizacja funkcjonalności

W tym podrozdziale poddano weryfikacji stopień realizacji początkowych założeń projektu. Dokumentacja dzieli wymagania na dwie kategorie, oceniając osobno funkcje krytyczne dla działania systemu społecznościowego oraz te stanowiące jego rozszerzenie.

\### 4.2.1. Funkcjonalności obowiązkowe

Poniżej zestawiono zrealizowane oraz brakujące elementy bazowe witryny. Moduły te były priorytetem podczas procesu implementacji.

\- \*\*Ekran przeglądania zewnętrznych treści. Funkcjonalność zrealizowana w pełni\*\*. Zaimplementowano główny kanał informacji w formacie pionowym, który poprawnie obsługuje i skaluje zdjęcia wysokiej rozdzielczości. Wyświetla on materiały pochodzące od innych użytkowników platformy.

\- \*\*Ekran przeglądania prywatnych treści użytkownika. Wymaganie spełnione\*\*. Użytkownik ma dostęp do widoku własnych materiałów oraz postów za pośrednictwem dedykowanego interfejsu w profilu konta.

\- \*\*System kont i nawiązywania znajomości. Wymaganie zrealizowane\*\*. Stworzono mechanizm rejestracji, logowania oraz system relacyjny pozwalający na obserwowanie innych profili w aplikacji.

\- \*\*System polubieni treści. Funkcjonalność zralizowana\*\*. Każdy post posiada interfejs pozwalający na wyrażenie polubienia, a akcje te są rejestrowane i przeliczane przez warstwę serwerową.

\- \*\*Ekran tworzenia treści. Funkcjonalność zrealizowana częściowo\*\*. Użytkownicy mogą wybierać i przesyłać zdjęcia ze swojej lokalnej galerii oraz dodawać do nich opisy tekstowe. Na obecnym etapie zrezygnowano jednak z implementacji systemu tagowania materiałów przed ich publikacją.

\- \*\*System zarządzania prywatnością postów. Funkcjonalność niezrealizowana\*\*. W systemie brakuje mechanizmu różnicującego widoczność materiałów na tryb prywatny, dostępny dla zweryfikowanych znajomych i publiczny. Wszystkie publikowane posty posiadają obecnie jeden status widoczności.

&#x20; 4.2.2. Funkcjonalności dodatkowe i rozszerzające

Druga faza wdrożeń obejmowała elementy wzbogacające interakcje w aplikacji i porządkujące dane o zwierzętach.

\- \*\*System komentarzy pod treściami. Funkcjonalność zrealizowana w pełni.\*\* Pod poszczególnymi postami wdrożono sekcję pozwalającą na dodawanie tekstowych uwag przez uwierzytelnionych użytkowników.

\- \*\*Rozbudowane profile dla zwierząt. Funkcjonalność zrealizowana niemal w pełni\*\*. System pozwala na utworzenie osobnej metryczki z opisem podopiecznego oraz umożliwia przypisywanie publikowanych postów do konkretnego zwierzęcia. W module tym pominęto opcję definiowania i przypisywania domyślnych tagów.

\- \*\*Implementacja silnika polecania treści. Wymaganie niezrealizowane\*\*. Kanał informacyjny nie posiada zaawansowanego algorytmu rekomendacji na podstawie zebranych polubień, a dobór treści opiera się na prostych zapytaniach do bazy danych.

\- \*\*Wbudowany moduł aparatu. Funkcjonalność niezrealizowana\*\*. Tworzenie postów opiera się na wgrywaniu plików graficznych z pamięci urządzenia, bez możliwości przechwytywania obrazu z poziomu samej aplikacji.

\- \*\*Obsługa krótkich filmików. Wymaganie niezrealizowane.\*\* Przetwarzanie i kompresja materiałów wideo okazały się procesem wymagającym odrębnej architektury, dlatego w obecnej iteracji platforma wspiera wyłącznie pliki graficzne.

\### 4.2.3. Plany wdrożeniowe dla funkcji niezrealizowanych

W pierwszej kolejności planowane jest zaimplementowanie brakującego systemu prywatności, który jest istotny z punktu widzenia bezpieczeństwa danych użytkowników.

W następnych krokach przewiduje się stworzenie modułu tagowania treści, co znacząco ułatwi późniejsze wprowadzenie algorytmicznego silnika rekomendacji. Obsługa wideo oraz natywny moduł aparatu wymagają optymalizacji działania po stronie klienckiej i przez co zostaną dodane względnie późno.

\# 5\\. Cykl życia i proces tworzenia aplikacji

Rozdział ten opisuje kolejne etapy powstawania systemu Petgram, od fazy początkowej analizy wymagań po przygotowanie infrastruktury uruchomieniowej. Proces deweloperski został podzielony na logiczne fazy, co pozwoliło na usystematyzowanie prac projektowych i programistycznych.

\## 5.1. Faza koncepcyjna i analityczna

Prace nad platformą rozpoczęto od wstępnego określenia pomysłu na system dedykowany miłośnikom zwierząt. W celu weryfikacji założeń przeprowadzono wywiad z pomysłodawcą oraz zrealizowano ankietę badawczą wśród potencjalnych użytkowników. Zebrane dane posłużyły do zdefiniowania głównych problemów, które aplikacja ma rozwiązywać, oraz oczekiwań docelowej grupy odbiorców.

Proces badawczy skutkował zebraniem wymagań funkcjonalnych i pozafunkcjonalnych. Wyniki prac analitycznych spisano, tworząc ostateczny dokument z założeniami projektu. Dokument ten ujednolicił wizję systemu i stanowił bazę do podejmowania dalszych decyzji architektonicznych oraz ustalania priorytetów realizacyjnych.

\## 5.2. Projektowanie architektury i interfejsu

Kolejnym etapem było przygotowanie wizualnej warstwy aplikacji. Zaprojektowano interfejs użytkownika w oprogramowaniu Figma, tworząc makiety głównych ekranów. Makiety te definiowały układ elementów, kolorystykę oraz zasady nawigacji, co stanowiło punkt odniesienia dla programistów pracujących nad warstwą kliencką.

Równolegle z pracami graficznymi przygotowano strukturę aplikacji oraz jej architekturę techniczną. Określono podział na warstwę frontendową i backendową, wybrano stos technologiczny oraz zdefiniowano modele bazodanowe. Zaplanowanie struktury katalogów i co najważniejsze podział logiki biznesowej aplikacji serwerowej między warstwy takie jak repository, service, controller itd.

\## 5.3. Faza implementacji i testowania

Właściwe prace programistyczne polegały na implementacji poszczególnych funkcji systemu. Kod pisano równolegle dla warstwy klienckiej i serwerowej, co pozwalało na sprawne łączenie interfejsu graficznego z logiką biznesową. Proces tworzenia kodu źródłowego był wspierany przez narzędzia oparte na sztucznej inteligencji, które wykorzystywano do generowania powtarzalnych fragmentów klas oraz przyspieszania prac deweloperskich.

Jakość tworzonego oprogramowania kontrolowano poprzez pisanie testów automatycznych. Testy te powstawały na bieżąco, wraz z implementacją kolejnych funkcji backendu. Takie podejście pozwoliło na wczesne wykrywanie błędów w kodzie oraz zapewniło stabilność głównych domen aplikacji podczas wprowadzania modyfikacji.

\## 5.4. Analityka, infrastruktura i plany wdrożeniowe

Po ustabilizowaniu bazowych funkcji systemu, do warstwy prezentacji zintegrowano skrypty analityczne. Wdrożono narzędzia Hotjar oraz Google Analytics, które odpowiadają za gromadzenie danych o ruchu sieciowym oraz zachowaniu użytkowników. Pozwala to na monitorowanie wydajności witryny oraz analizę punktów styku użytkownika z interfejsem.

W celu uproszczenia procesu uruchamiania systemu przygotowano konfigurację wirtualizacji opartą na technologii Docker. Utworzono pliki budujące obrazy dla serwera i klienta oraz zdefiniowano parametry sieciowe w pliku kompozycji. Eliminuje to konieczność ręcznej instalacji zależności systemowych przez osoby uruchamiające kod na lokalnych maszynach.

Ostatnim etapem cyklu życia projektu jest udostępnienie gotowego rozwiązania użytkownikom końcowym. Aktualnie proces wdrożenia produkcyjnego na serwer, czyli deploy aplikacji, znajduje się w fazie planowania. Wymaga on przygotowania docelowej bazy danych oraz zabezpieczenia środowiska serwerowego udostępnianego w sieci publicznej.

\# 6\\. Wnioski i plany na rozwój

\## 6.1. Podsumowanie realizacji projektu

Proces tworzenia aplikacji potwierdził słuszność przyjętych na wstępie założeń analitycznych. Zespołowi udało się zaimplementować architekturę oraz zrealizować większość krytycznych funkcji określonych w fazie projektowej. System z powodzeniem obsługuje procesy autoryzacji, tworzenie profili zwierząt oraz publikację materiałów graficznych.

Interfejs użytkownika dzięki wcześniejszemu zaprojektowaniu i ustaleniu spójnej kolorystyki i projektu robi wrażenie profesjonalnego i wysokiej jakości. Bardzo pomocne było również jasne i sztywne zdefiniowanie warstw i struktury aplikacji, dzięki czemu implementacja poszczególnych funkcji mogła przebiegać szybciej dzięki wykorzystaniu narzędzi AI, które w sztywno zdefiniowanej strukturze miały tendencje do generowania kodu z bardziej zadowalającymi rezultatami. Wdrożona wersja demonstracyjna stanowi stabilną podstawę do dalszej rozbudowy.

\## 6.2. Obszary do poprawy i harmonogram dalszego rozwoju

\- Wymagane funkcje:

&#x20; - Dokończenie systemu zarządzania prywatnością, aby zagwarantować ograniczenie widoczności postów wyłącznie do zweryfikowanych znajomych.

&#x20; - Publikacja treści wymaga integracji mechanizmu tagowania, który stanowi fundament dla algorytmów wyszukiwania.

&#x20; - Przygotowanie mechanizmu podpowiadania pożądanych treści w feed użytkownika.

\- Obszary do poprawy i optymalizacji:

&#x20; - Należy wdrożyć mechanizmy kompresji obrazów po stronie klienta.

&#x20; - Należy wdrożyć asynchroniczne i niezależne ładowanie grafik postów z efektami loader dla użytkowników przeglądarek mobilnych mających słaby dostęp do sieci.

\- Kamienie milowe do zrealizowania:

&#x20; - Migracja bazy danych na PostgreSQL.

&#x20; - Przeprowadzenie deploy aplikacji.

&#x20; - Przygotowanie aplikacji mobilnej z natywnym modułem aparatu.

&#x20; - Wsparcie krótkich materiałów wideo.

&#x20; - Przygotowanie mechanizmów zarządzania społecznością aplikacji dla kont moderatorów.
