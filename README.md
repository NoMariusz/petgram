# Petgram 🐾

> Platforma społecznościowa przeznaczona do publikowania i przeglądania materiałów wizualnych z udziałem zwierząt. Aplikacja opiera się na interfejsie typu vertical scrolling. Głównym celem projektu jest stworzenie bazy treści skupionej wyłącznie na tematyce zoologicznej, wolnej od treści niezwiązanych ze zwierzętami i inwazyjnych reklam. System pozwala właścicielom na dokumentowanie rozwoju ich podopiecznych oraz przypisywanie cyfrowych pamiątek do dedykowanych profili zwierząt.

## Funkcje

W obecnej wersji platforma udostępnia następujące funkcjonalności:

- **🖼️ Kanał informacji (Feed)**: Przeglądanie publicznych treści i postów od obserwowanych użytkowników w formacie pionowym obsługującym zdjęcia.
- **☺️ Profile użytkowników**: Tworzenie kont, przeglądanie własnych materiałów, edycja danych oraz system nawiązywania znajomości (obserwowanie innych twórców).
- **🐶 Profile zwierząt**: Odrębne metryczki dla podopiecznych, przechowujące ich dane stałe (np. gatunek, rasa, data urodzenia). Możliwość przypisywania publikowanych postów do konkretnego zwierzęcia.
- **✏️ Zarządzanie treścią**: Moduł tworzenia postów pozwalający na wybór zdjęcia z urządzenia oraz dodanie tekstu i wyboru pupili których dotyczy post.
- **❤️ Interakcje społeczne**: System polubień postów oraz możliwość dodawania komentarzy pod publikacjami.

## Przedstawienie działania

Poniżej znajdują się zrzuty ekranu prezentujące interfejs i działanie głównych modułów platformy Petgram.

![Ekran logowania](https://github.com/user-attachments/assets/15178c54-c045-4cba-bea6-2e3ab7a731ca)
![Ekran postów](https://github.com/user-attachments/assets/1e5b6541-d196-408b-84d8-c450adfb30e6)
![Ekran profilu użytkownika](https://github.com/user-attachments/assets/77a75194-473e-4101-8f89-02753da52a5c)
![Ekran profilu zwierzęcia](https://github.com/user-attachments/assets/44fa2797-6fcd-46a0-bf87-445c47547bbe)
![Ekran tworzenia posta](https://github.com/user-attachments/assets/9b8e0495-ad5b-4f7e-beb6-ace8c7be30d7)

## Wykorzystane narzędzia

Projekt podzielono na dwie warstwy (klient-serwer) i zaimplementowano z użyciem następujących technologii:

**Warstwa kliencka (Frontend)**

- React
- Vite
- React Router
- TailwindCSS
- TypeScript

**Warstwa serwerowa (Backend)**

- Java 17
- Spring Boot
- Gradle
- Hibernate / Spring Data JPA
- JWT (JSON Web Token) do autoryzacji

**Infrastruktura i Baza Danych**

- Docker & Docker Compose
- PostgreSQL (skonfigurowany w środowisku deweloperskim/produkcyjnym w oparciu o kontenery) oraz SQLite (jako wariant testowy/lokalny)

**Narzędzia analityczne i projektowe**

- Figma
- Google Analytics (React-GA4)
- Hotjar

## Instrukcja uruchomienia projektu

Aplikacja została skonteneryzowana przy pomocy narzędzia Docker, co pozwala na jej uruchomienie bez konieczności manualnej konfiguracji środowiska programistycznego i bazy danych.

**Wymagania wstępne:**

- Zainstalowany Docker
- Zainstalowana wtyczka Docker Compose

**Kroki uruchomienia:**

1. Sklonuj repozytorium projektu na swoje urządzenie:

```bash
git clone https://github.com/NoMariusz/petgram.git
cd petgram
```

2. Skonfiguruj zmienne środowiskowe dla warstwy backendowej. W katalogu backendu utwórz plik `.env` na podstawie dostarczonego szablonu i uzupełnij zmienne dla bazy danych PostgreSQL (wymagane w `backend.yaml`):

```bash
cp backend/petgram-backend/.env-template backend/petgram-backend/.env
```

3. Skonfiguruj zmienne środowiskowe dla warstwy frontendowej (jeśli dotyczy):

```bash
cp frontend/.env-template frontend/.env
```

4. Z poziomu głównego katalogu (tam, gdzie znajduje się główny plik `compose.yaml`), zbuduj i uruchom kontenery w tle:

```bash
docker compose up -d
```

5. Po poprawnym zbudowaniu i uruchomieniu serwisów aplikacja będzie dostępna pod następującymi adresami:

- **Frontend (Aplikacja kliencka):** `http://localhost:3000`
- **Backend (API):** `http://localhost:8080`

_Uwaga: Usługa frontendowa (`frontend.yaml`) uzależniona jest od gotowości (`service_healthy`) warstwy backendowej. Pełne uruchomienie bazy danych PostgreSQL i API Spring Boot może zająć kilkadziesiąt sekund._

## Struktura projektu

#### Struktura backendu

- Aplikacja serwerowa opiera się na architekturze wielowarstwowej, kod został zorganizowany w warstwy:
    - kontrolerów odbierających żądania
    - serwisów przetwarzających reguły biznesowe
    - warstwę dostępu do danych komunikującą się bezpośrednio z bazą
- Główne domeny systemu to:
    - użytkownik (Users)
    - profil zwierzęcia (Pets)
    - posty (Posts)
    - Poza nimi występują również pomocnicze w ramach konkeretnych mechanizmów, np. domena uwierzytelniania (Auth), czy przechowywania plików (FileStorage).

#### Struktura frontendu

Kod aplikacji frontendowej podzielono na następujące główne foldery:

- utils – Miejsce przechowywania reużywalnych funkcji np. formatowania daty.
- components - Przestrzeń przeznaczona na moduły interfejsu użytkownika wielokrotnego użytku, możliwe do zastosowania w różnych miejscach systemu.
- data - Przestrzeń przechowująca mechanizmy związane z danymi zarówno zewnętrznymi jak i stałymi w aplikacji.
- routes - Przestrzeń strukturyzująca pliki poszczególnych widoków ekranów zgodnie z ustaloną logiką nawigacji systemowej.

#### Struktura danych

Strukturę danych prezentuje poniższy diagram ERD bazy danych:

![Diagram ERD](https://github.com/user-attachments/assets/c13b1c32-b056-420d-9915-112512eaa1c0)

## Ograniczenia

- W obecnej wersji brak systemu wideo
- Brak systemu tagowania treści
- Brak wbudowanego w aplikacje modułu aparatu
- Ograniczenia wynikające z braku pełnej optymalizacji pobierania zdjęć (lazy-loading w planach)

## Wykorzystanie narzędzi analitycznych i projektowych

### Wykorzystanie Figma

Przed przystąpieniem do właściwych prac implementacji aplikacji przygotowano wcześniej projekt wyglądu ekranów za pomocą aplikacji Figma Design, oraz utworzono interaktywną makietę.

- Link do projektu Figma: https://www.figma.com/design/h89H6nvuK3eFdUa4CjpQzj/petgram?node-id=0-1&t=hAW7cohp67LzwB4o-1
- Link do interaktywnej makiety: https://www.figma.com/proto/h89H6nvuK3eFdUa4CjpQzj/petgram?node-id=86-749&t=o3Ge3en31aA1Vfik-1

### Wykorzystanie Google Analytics

Do aplikacji klienckiej zintegrowano bibliotekę Google Analytics. Narzędzie służy do zbierania ilościowych danych o ruchu sieciowym oraz śledzenia odsłon poszczególnych widoków aplikacji. 

![Google Analytics](https://github.com/user-attachments/assets/4810312a-9493-4bce-ae6b-a86e7ab116a9)
![Google Analytics](https://github.com/user-attachments/assets/454dd881-1a16-4d9d-b378-dfbf0e3b1d82)

### Wykorzystanie Hotjar

⚠️ TODO: Weryfikacja poniższego opisu

W projekcie wdrożono oprogramowanie Hotjar w celu analizy jakościowej i monitorowania sposobu, w jaki użytkownicy wchodzą w interakcję z interfejsem (vertical scrolling). Moduł ten pozwala na generowanie map interakcji (heatmaps) oraz rejestrowanie sesji, co służy do identyfikacji obszarów sprawiających trudności nawigacyjne i optymalizacji rozmieszczenia elementów takich jak ikony polubień czy przycisk publikacji.

⚠️ TODO: umieszczenie "screeny aplikacji w hotjar"

## Informacje o autorach

- **Kacper Baniak** - Badania preferencji użytkownika i UX ; Implementacja domeny postów ; Inżynier infrastruktury
- **Mariusz Gosławski** - Pomysłodawca i funkcjonalności ; Implementacja domeny uzytkowników ; Product designer
- **Bartosz Grzybowski** - Grafika ; Implementacja domeny pupili ; UI Designer
