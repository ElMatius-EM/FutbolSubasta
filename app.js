// ======================== DATA ========================
const PLAYER_COLORS = ['#f5c842', '#e74c3c', '#3498db', '#2ecc71'];

const TACTICS = {
    '4-3-3': { DEF: 4, MED: 3, DEL: 3 },
    '4-4-2': { DEF: 4, MED: 4, DEL: 2 },
    '4-2-3-1': { DEF: 4, MED: 5, DEL: 1 },
    '3-5-2': { DEF: 3, MED: 5, DEL: 2 },
    '5-3-2': { DEF: 5, MED: 3, DEL: 2 },
    '4-5-1': { DEF: 4, MED: 5, DEL: 1 },
    '3-4-3': { DEF: 3, MED: 4, DEL: 3 },
};

// Silhouette SVG paths (multiple variations)
const SILHOUETTES = [
    // Running player 1
    `<circle cx="60" cy="22" r="12" fill="currentColor"/>
   <path d="M48 40 Q60 35 72 40 L78 80 Q65 75 55 78 L58 110 Q62 130 55 150 L45 185" stroke="currentColor" stroke-width="8" fill="none" stroke-linecap="round"/>
   <path d="M58 110 Q52 130 45 150 L35 185" stroke="currentColor" stroke-width="8" fill="none" stroke-linecap="round"/>
   <path d="M72 40 L88 70 L80 90" stroke="currentColor" stroke-width="7" fill="none" stroke-linecap="round"/>
   <path d="M48 40 L32 65 L38 88" stroke="currentColor" stroke-width="7" fill="none" stroke-linecap="round"/>`,
    // Dribbling player
    `<circle cx="60" cy="20" r="13" fill="currentColor"/>
   <path d="M50 38 Q60 33 70 38 L76 82 Q63 78 53 80 L56 115 Q58 138 48 160 L38 190" stroke="currentColor" stroke-width="8" fill="none" stroke-linecap="round"/>
   <path d="M56 115 Q60 138 72 158 L82 188" stroke="currentColor" stroke-width="8" fill="none" stroke-linecap="round"/>
   <path d="M50 38 L30 60 L22 90" stroke="currentColor" stroke-width="7" fill="none" stroke-linecap="round"/>
   <path d="M70 38 L88 58 L85 90 L95 100" stroke="currentColor" stroke-width="7" fill="none" stroke-linecap="round"/>
   <circle cx="95" cy="108" r="10" stroke="currentColor" stroke-width="3" fill="none"/>`,
    // Goalkeeper stance
    `<circle cx="60" cy="20" r="13" fill="currentColor"/>
   <path d="M47 38 Q60 32 73 38 L82 70 Q70 78 60 76 Q50 78 38 70 Z" fill="currentColor"/>
   <path d="M38 70 L20 60 L10 80" stroke="currentColor" stroke-width="7" fill="none" stroke-linecap="round"/>
   <path d="M82 70 L100 58 L112 78" stroke="currentColor" stroke-width="7" fill="none" stroke-linecap="round"/>
   <path d="M52 76 L48 120 L42 170 L35 195" stroke="currentColor" stroke-width="8" fill="none" stroke-linecap="round"/>
   <path d="M68 76 L72 120 L78 170 L85 195" stroke="currentColor" stroke-width="8" fill="none" stroke-linecap="round"/>`,
    // Shooting pose
    `<circle cx="55" cy="18" r="12" fill="currentColor"/>
   <path d="M44 35 Q55 30 66 35 L72 72 L60 78 L50 74 L44 35" fill="currentColor"/>
   <path d="M44 35 L25 52 L15 78" stroke="currentColor" stroke-width="7" fill="none" stroke-linecap="round"/>
   <path d="M66 35 L85 45 L95 30" stroke="currentColor" stroke-width="7" fill="none" stroke-linecap="round"/>
   <path d="M50 74 L42 115 L30 155 L22 188" stroke="currentColor" stroke-width="8" fill="none" stroke-linecap="round"/>
   <path d="M60 78 L68 120 L82 158 L92 185" stroke="currentColor" stroke-width="8" fill="none" stroke-linecap="round"/>`,
];

// ======================== PLAYER DATABASE ========================
const PLAYERS_DB = [
    // Premier League
    { name: "Erling Haaland", photo: "img/players/haaland.png", pos: "DEL", club: "Manchester City", league: "Premier League", nation: "Noruega", value: 180, rarity: "⭐⭐", hints: ["Nórdico de más de 1.90m", "Su padre también fue futbolista profesional", "Récord de goles en Champions en una sola temporada", "Juega en el equipo azul más exitoso de Inglaterra", "Es el centro delantero más cotizado del mundo"] },
    { name: "Mohamed Salah", photo: "img/players/salah.png", pos: "DEL", club: "Liverpool", league: "Premier League", nation: "Egipto", value: 80, rarity: "⭐⭐", hints: ["El Faraón del fútbol africano", "Campeón con los Reds en la Premier y Champions", "Zurdo letal ante el arco", "Su número es el 11 en el equipo de Anfield"] },
    { name: "Harry Kane", photo: "img/players/kane.png", pos: "DEL", club: "Bayern München", league: "Bundesliga", nation: "Inglaterra", value: 100, rarity: "⭐⭐", hints: ["Capitán de la selección inglesa", "Llegó a Alemania por cifra récord", "Especialista en penales y goles de cabeza", "Nunca ha ganado un título de liga"] },
    { name: "Kevin De Bruyne", photo: "img/players/debruyne.png", pos: "MED", club: "Manchester City", league: "Premier League", nation: "Bélgica", value: 85, rarity: "⭐⭐", hints: ["Considerado el mejor mediocampista del mundo", "Fue formado en el Chelsea pero despuntó en Alemania", "Tiene la asistencia perfecta con su pie derecho", "Juega con la camiseta número 17"] },
    { name: "Jude Bellingham", photo: "img/players/bellingham.png", pos: "MED", club: "Real Madrid", league: "La Liga", nation: "Inglaterra", value: 180, rarity: "⭐⭐", hints: ["Debutó en el Borussia Dortmund siendo adolescente", "Llegó a España por más de 100 millones", "Encestó el gol del empate en el Mundial 2022 para Inglaterra", "Mediocampista completo con gol incluído"] },
    { name: "Bukayo Saka", photo: "img/players/saka.png", pos: "DEL", club: "Arsenal", league: "Premier League", nation: "Inglaterra", value: 120, rarity: "⭐", hints: ["Extremo de origen nigeriano criado en Londres", "Juega para el equipo del norte de Londres", "Falló el penal en la final de la Eurocopa 2021", "Tiene menos de 25 años y ya es titular indiscutido"] },
    { name: "Phil Foden", photo: "img/players/foden.png", pos: "MED", club: "Manchester City", league: "Premier League", nation: "Inglaterra", value: 120, rarity: "⭐", hints: ["Surgió de la cantera del City", "Apodado el 'Niño de Stockport'", "Gana la Premier League casi cada temporada", "Mediapunta creativo de pie izquierdo"] },
    { name: "Trent Alexander-Arnold", photo: "img/players/alexander-arnold.png", pos: "DEF", club: "Liverpool", league: "Premier League", nation: "Inglaterra", value: 80, rarity: "⭐", hints: ["Lateral derecho con técnica de mediocampista", "Surgido de la academia del Liverpool", "Sus centros y tiros libres son devastadores", "Tiene un asombroso pase a larga distancia"] },
    // La Liga
    { name: "Vinicius Jr.", photo: "img/players/vinicius.png", pos: "DEL", club: "Real Madrid", league: "La Liga", nation: "Brasil", value: 200, rarity: "⭐⭐", hints: ["Brasileño de Río de Janeiro", "Surgió en el Flamengo", "Ganó el Balón de Oro", "Su desborde por la izquierda aterroriza a cualquier defensa"] },
    { name: "Kylian Mbappé", photo: "img/players/mbappe.png", pos: "DEL", club: "Real Madrid", league: "La Liga", nation: "Francia", value: 180, rarity: "⭐⭐", hints: ["Campeón mundial con Francia en 2018", "Llegó al Madrid como el fichaje más esperado", "Velocista que humilló a muchos defensores", "Surgió en el AS Mónaco siendo muy joven"] },
    { name: "Pedri", photo: "img/players/pedri.png", pos: "MED", club: "Barcelona", league: "La Liga", nation: "España", value: 100, rarity: "⭐⭐", hints: ["Canario de las Islas Canarias", "Heredero del estilo de Iniesta", "Ganó premios a mejor jugador joven del mundo", "Centrocampista técnico y elegante del Barça"] },
    { name: "Gavi", photo: "img/players/gavi.png", pos: "MED", club: "Barcelona", league: "La Liga", nation: "España", value: 90, rarity: "⭐", hints: ["Ganó el Balón de Oro sub-21", "Nacido en Los Palacios, Sevilla", "Volante combativo y creativo del Barça", "Es de los más jóvenes en debutar con España"] },
    { name: "Lamine Yamal", photo: "img/players/yamal.png", pos: "DEL", club: "Barcelona", league: "La Liga", nation: "España", value: 200, rarity: "⭐⭐", hints: ["El más joven en debutar y marcar con España", "Surgió de La Masía del Barcelona", "Ganó la Eurocopa 2024 con menos de 17 años", "Extremo derecho de origen marroquí y ecuatoguineano"] },
    { name: "Thibaut Courtois", photo: "img/players/courtois.png", pos: "ARQ", club: "Real Madrid", league: "La Liga", nation: "Bélgica", value: 60, rarity: "⭐", hints: ["Arquero de más de 2 metros", "Elegido MVP de la Final de Champions 2022", "Fue del Atlético antes que del Real Madrid", "Belga considerado el mejor arquero del mundo"] },
    // Serie A
    { name: "Rafael Leão", photo: "img/players/leao.png", pos: "DEL", club: "AC Milan", league: "Serie A", nation: "Portugal", value: 90, rarity: "⭐⭐", hints: ["Extremo izquierdo luso del Milan", "Surgió en el Sporting de Lisboa", "Velocidad explosiva y regate eléctrico", "Uno de los extremos más desequilibrantes de Europa"] },
    { name: "Federico Chiesa", photo: "img/players/chiesa.png", pos: "DEL", club: "Liverpool", league: "Premier League", nation: "Italia", value: 50, rarity: "⭐", hints: ["Hijo de un ex jugador italiano", "Surgió en la Fiorentina", "Ganó la Eurocopa con la Azzurra en 2021", "Extremo italiano que fue traspasado al Liverpool"] },
    { name: "Victor Osimhen", photo: "img/players/osimhen.png", pos: "DEL", club: "Galatasaray", league: "Turquía", nation: "Nigeria", value: 75, rarity: "⭐", hints: ["Nigeriano de gran potencia física", "Goleador del Napoli en su año de Scudetto", "Pasó por el Lille antes de llegar a Italia", "Su trayectoria incluye la Bundesliga y la Serie A"] },
    // Bundesliga
    { name: "Florian Wirtz", photo: "img/players/wirtz.png", pos: "MED", club: "Bayer Leverkusen", league: "Bundesliga", nation: "Alemania", value: 150, rarity: "⭐⭐", hints: ["Alemán considerado la próxima gran estrella del fútbol", "Jugó toda su juventud en el Leverkusen", "Ganó la Bundesliga sin perder un partido", "Mediocampista ofensivo de gran técnica y visión"] },
    { name: "Jamal Musiala", photo: "img/players/musiala.png", pos: "MED", club: "Bayern München", league: "Bundesliga", nation: "Alemania", value: 130, rarity: "⭐⭐", hints: ["Nacido en Stuttgart pero criado en Inglaterra", "Eligió jugar para Alemania sobre Inglaterra", "Mediapunta elegante del Bayern München", "Uno de los más prometedores del fútbol mundial"] },
    { name: "Manuel Neuer", photo: "img/players/neuer.png", pos: "ARQ", club: "Bayern München", league: "Bundesliga", nation: "Alemania", value: 15, rarity: "⭐", hints: ["Inventó el concepto de arquero sweeper", "Portero durante más de una década del Bayern", "Campeón del mundo con Alemania en 2014", "El arquero más influyente de los últimos 15 años"] },
    // Ligue 1
    { name: "Ousmane Dembélé", photo: "img/players/dembele.png", pos: "DEL", club: "PSG", league: "Ligue 1", nation: "Francia", value: 60, rarity: "⭐", hints: ["Extremo derecho de sorprendente velocidad", "Pasó por el Dortmund antes del Barcelona", "Francés con sangre senegalesa y mauritana", "Traspasado del Barça al PSG en años recientes"] },
    { name: "Achraf Hakimi", photo: "img/players/hakimi.png", pos: "DEF", club: "PSG", league: "Ligue 1", nation: "Marruecos", value: 65, rarity: "⭐", hints: ["Lateral derecho de origen marroquí", "Fue formado en el Real Madrid", "Brilló en el Inter de Milán con Conte", "Jugó a Inter y Borussia Dortmund antes del PSG"] },
    // Liga Argentina
    { name: "Enzo Fernández", photo: "img/players/enzo.png", pos: "MED", club: "Chelsea", league: "Premier League", nation: "Argentina", value: 75, rarity: "⭐", hints: ["Campeón del mundo con Argentina en Qatar 2022", "Surgió en River Plate", "El traspaso más caro de la historia del Chelsea", "Mediocampista box-to-box de gran físico"] },
    { name: "Julián Álvarez", photo: "img/players/alvarez.png", pos: "DEL", club: "Atlético de Madrid", league: "La Liga", nation: "Argentina", value: 90, rarity: "⭐⭐", hints: ["La Araña mendocina", "Brilló en el Manchester City con Guardiola", "Goleador del Mundial de Qatar", "Surgió en River Plate de Argentina"] },
    { name: "Alejandro Garnacho", photo: "img/players/garnacho.png", pos: "DEL", club: "Manchester United", league: "Premier League", nation: "Argentina", value: 60, rarity: "⭐", hints: ["Nacido en España pero eligió jugar para Argentina", "Extremo veloz del Manchester United", "Conocido por sus acrobacias y jugadas de talón", "Tiene menos de 23 años"] },
    { name: "Rodrigo De Paul", photo: "img/players/depaul.png", pos: "MED", club: "Atlético de Madrid", league: "La Liga", nation: "Argentina", value: 40, rarity: "⭐", hints: ["Motor del mediocampo argentino", "Jugó en Udinese antes del Atlético", "Campeón del mundo en Qatar 2022", "Conocido por su esfuerzo y ritmo de juego"] },
    { name: "Emiliano Martínez", photo: "img/players/emiliano.png", pos: "ARQ", club: "Aston Villa", league: "Premier League", nation: "Argentina", value: 40, rarity: "⭐", hints: ["Ganó el Guante de Oro en el Mundial 2022", "Conocido por desconcentrar rivales en penales", "Argentino que surgió de las canteras del Arsenal", "Arquero campeón del mundo con la Albiceleste"] },
    // Sudamericanas
    { name: "Endrick", photo: "img/players/endrick.png", pos: "DEL", club: "Real Madrid", league: "La Liga", nation: "Brasil", value: 60, rarity: "⭐", hints: ["Surgió en el Palmeiras de Brasil", "Joven promesa que llegó al Madrid siendo adolescente", "Delantero centro de gran instinto goleador", "Considerado el futuro del fútbol brasileño"] },
    { name: "Rodrygo", photo: "img/players/rodrygo.png", pos: "DEL", club: "Real Madrid", league: "La Liga", nation: "Brasil", value: 90, rarity: "⭐⭐", hints: ["Surgió en el Santos de Brasil", "Especialista en goles en Champions en los últimos minutos", "Apodado el 'niño maravilla' del Real Madrid", "Extremo derecho de gran técnica"] },
    { name: "Darwin Núñez", photo: "img/players/nunez.png", pos: "DEL", club: "Liverpool", league: "Premier League", nation: "Uruguay", value: 65, rarity: "⭐", hints: ["Uruguayo con gran potencia física", "Fue del Benfica antes del Liverpool", "Llegó por una cifra cercana a los 100 millones", "Delantero con instinto goleador y velocidad explosiva"] },
    { name: "Luis Díaz", photo: "img/players/diaz.png", pos: "DEL", club: "Liverpool", league: "Premier League", nation: "Colombia", value: 65, rarity: "⭐", hints: ["Colombiano que llegó desde el Porto", "Extremo izquierdo de gran velocidad", "Sus padres fueron secuestrados en Colombia", "Conocido por su dribbling en espacios reducidos"] },
    // DTs
    { name: "Pep Guardiola", photo: "img/players/guardiola.png", pos: "DT", club: "Manchester City", league: "Premier League", nation: "España", value: 30, rarity: "⭐⭐", hints: ["Catalán que revolucionó el fútbol moderno", "Exjugador del Barça y capitán español", "Máximo ganador de Champions de los últimos años", "Creador del tiqui-taca y la presión alta"] },
    { name: "Jürgen Klopp", photo: "img/players/klopp.png", pos: "DT", club: "Liverpool", league: "Premier League", nation: "Alemania", value: 20, rarity: "⭐", hints: ["Alemán carismático conocido por su intensidad", "Campeón de Premier League y Champions con el Liverpool", "Construyó un equipo alemán de éxito antes del Liverpool", "Renunció voluntariamente tras años en el club"] },
    { name: "Carlo Ancelotti", photo: "img/players/ancelotti.png", pos: "DT", club: "Real Madrid", league: "La Liga", nation: "Italia", value: 25, rarity: "⭐⭐", hints: ["Italiano con más títulos de Champions como DT", "Entrenó al Madrid, Barça, Milan, Bayern y Chelsea", "Conocido por su tranquilidad y gestión del vestuario", "El único que ganó las 5 grandes ligas europeas"] },
    { name: "Diego Simeone", photo: "img/players/simeone.png", pos: "DT", club: "Atlético de Madrid", league: "La Liga", nation: "Argentina", value: 20, rarity: "⭐", hints: ["Argentino que nunca se fue del Atlético", "Exjugador del club que ahora dirige", "Conocido por su fútbol defensivo y organizado", "Llegó a dos finales de Champions en la última década"] },
    // Leyendas
    { name: "Ronaldinho", photo: "img/players/ronaldinho.png", pos: "DEL", club: "Barcelona (2003-08)", league: "Leyenda", nation: "Brasil", value: 0, rarity: "🏆", isLegend: true, hints: ["Brasileño de dientes prominentes y sonrisa eterna", "Ganó el Balón de Oro en 2005", "Sus movimientos de cadera eran inimitables", "Hizo aplaudir hasta a los hinchas del Bernabéu"] },
    { name: "Zinedine Zidane", photo: "img/players/zidane.png", pos: "MED", club: "Real Madrid", league: "Leyenda", nation: "Francia", value: 0, rarity: "🏆", isLegend: true, hints: ["Franco-argelino de cabeza rapada", "Marcó la volea más bella en una final de Champions", "El mismo golpeó a un rival con la cabeza en un Mundial", "Campeón mundial en 1998 como jugador"] },
    { name: "Diego Maradona", photo: "img/players/maradona.png", pos: "MED", club: "Nápoles / Boca", league: "Leyenda", nation: "Argentina", value: 0, rarity: "🏆", isLegend: true, hints: ["Pibe de Villa Fiorito", "La Mano de Dios y el Gol del Siglo son suyos", "Campeón del mundo en México 1986", "Ídolo eterno del Napoli y Boca Juniors"] },
    { name: "Ronaldo Nazário", photo: "img/players/ronaldo-nazario.png", pos: "DEL", club: "Real Madrid / Inter", league: "Leyenda", nation: "Brasil", value: 0, rarity: "🏆", isLegend: true, hints: ["El Fenómeno brasileño", "Mejor goleador de todos los Mundiales de la historia", "Dos veces campeón mundial con Brasil", "Conocido por su corte de pelo en el Mundial 2002"] },
    { name: "Lionel Messi", photo: "img/players/messi.png", pos: "DEL", club: "Inter Miami", league: "MLS", nation: "Argentina", value: 50, rarity: "🏆", isLegend: false, hints: ["Rosarino que emigró a Barcelona siendo niño", "8 veces Balón de Oro", "Campeón mundial con Argentina en Qatar 2022", "Jugó gran parte de su carrera en el Barça"] },
    { name: "Cristiano Ronaldo", photo: "img/players/cristiano.png", pos: "DEL", club: "Al Nassr", league: "Saudi Pro League", nation: "Portugal", value: 20, rarity: "🏆", isLegend: false, hints: ["Madeirense que surgió en el Sporting", "5 Balones de Oro", "Campeón de Champions con Manchester United y Real Madrid", "Juega actualmente en Arabia Saudita"] },
];

// ======================== TRAP CARDS ========================
const TRAP_CARDS = [
    { name: "Ronaldo Nazário (2026)", pos: "DEL", club: "???", league: "Trampa", nation: "Brasil", value: 0, rarity: "🃏", isTrap: true, hints: ["Dicen que volvió al fútbol profesional", "Viste siempre los colores de Brasil", "Dicen que sigue marcando goles a sus casi 50 años", "Es el Fenómeno... ¿o no?"], trapReveal: "Ronaldo Nazário... en 2026. Tiene 49 años, pero la silueta era idéntica." },
    { name: "Primo de Messi", pos: "MED", club: "C.A. Laferrere", league: "Regional Arg.", nation: "Argentina", value: 0, rarity: "🃏", isTrap: true, hints: ["Juega en Argentina", "Tiene el mismo apellido que una megaestrella", "Sus amigos dicen que tiene la misma magia", "Nació a pocas cuadras de Rosario"], trapReveal: "Era el primo de Messi. Juega en la liga regional de Buenos Aires." },
    { name: "Utilero del Barcelona", pos: "DEL", club: "Barcelona", league: "Trampa", nation: "España", value: 0, rarity: "🃏", isTrap: true, hints: ["Trabaja en el Camp Nou / Spotify Camp Nou", "Conoce a todos los jugadores del primer equipo", "Lleva la camiseta del Barça todos los días", "Sus arranques con el balón sorprenden en los entrenamientos"], trapReveal: "Era el utilero del Barcelona. Lleva 15 años en el club pero nunca jugó un partido oficial." },
    { name: "Maradona a los 15 años", pos: "MED", club: "Argentinos Juniors", league: "Trampa", nation: "Argentina", value: 0, rarity: "🃏", isTrap: true, hints: ["Nació en el conurbano bonaerense", "Ya a los 15 maravillaba a los scouts", "Su club de origen tiene un nombre científico", "Era zurdo y gambeteador nato"], trapReveal: "¡Era Maradona, pero de 15 años! La foto es de 1975 en Argentinos Juniors." },
];

// ======================== STATE ========================
let state = {
    numPlayers: 2,
    players: [],
    currentPlayerDeck: [],
    currentCardIndex: 0,
    currentCard: null,
    selectedBuyer: null,
    purchaseHistory: [],
    squadBuilderIndex: 0,
    currentTacticSlot: null,
    pendingOffers: [],
    votes: {},
    squadsDone: [],
    transfersDone: {},
};

// ======================== HELPERS ========================
function goTo(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}
function showRules() { document.getElementById('modal-rules').classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
function fmt(n) { return (n >= 1000 ? (n / 1000).toFixed(1) + 'B' : n + 'M'); }
function fmtFull(n) { return '$' + n + 'M'; }

// ======================== SETUP ========================
function setPlayerCount(n) {
    state.numPlayers = n;
    document.querySelectorAll('#count-btns .btn').forEach((b, i) => b.classList.toggle('active', i === n - 2));
    renderPlayersForm();
}

function renderPlayersForm() {
    const form = document.getElementById('players-form');
    form.innerHTML = '';
    for (let i = 0; i < state.numPlayers; i++) {
        const div = document.createElement('div');
        div.innerHTML = `
      <div class="section-title" style="color:${PLAYER_COLORS[i]}">
        <span class="player-color" style="background:${PLAYER_COLORS[i]}"></span>Jugador ${i + 1}
      </div>
      <div class="player-row">
        <div class="field-group">
          <label>Nombre del jugador</label>
          <input type="text" id="pname-${i}" placeholder="Ej: Juan" value="${state.players[i]?.pname || ''}">
        </div>
        <div class="field-group">
          <label>Nombre del equipo</label>
          <input type="text" id="tname-${i}" placeholder="Ej: Los Invencibles" value="${state.players[i]?.tname || ''}">
        </div>
      </div>`;
        form.appendChild(div);
    }
}

function startGame() {
    state.players = [];
    for (let i = 0; i < state.numPlayers; i++) {
        const pname = document.getElementById(`pname-${i}`).value.trim() || `Jugador ${i + 1}`;
        const tname = document.getElementById(`tname-${i}`).value.trim() || `Equipo ${i + 1}`;
        state.players.push({
            id: i,
            pname,
            tname,
            color: PLAYER_COLORS[i],
            budget: 1000,
            skips: 5,
            squad: [], // {player, price, role: 'titular'|'suplente'|'dt'}
            tactics: '4-3-3',
            pitchLayout: {},
            transfersUsed: 0,
        });
    }
    state.votes = {};
    state.squadsDone = [];
    state.purchaseHistory = [];
    state.transfersDone = {};
    buildDeck();
    state.currentCardIndex = 0;
    goTo('screen-auction');
    renderAuction();
}

const WAVE_ORDER = ['ARQ', 'DEF', 'MED', 'DEL', 'DT'];

function buildDeck() {
    // Separate players by position
    const byPos = {};
    WAVE_ORDER.forEach(pos => byPos[pos] = []);
    PLAYERS_DB.forEach(p => { if (byPos[p.pos]) byPos[p.pos].push({ ...p }); });

    // Shuffle each group
    WAVE_ORDER.forEach(pos => byPos[pos].sort(() => Math.random() - 0.5));

    // Distribute trap cards across ARQ/DEF/MED/DEL waves (not DT)
    const traps = TRAP_CARDS.slice(0, 4).sort(() => Math.random() - 0.5);
    const waveTargets = ['ARQ', 'DEF', 'MED', 'DEL'];
    traps.forEach((t, i) => {
        const wave = waveTargets[i % waveTargets.length];
        const insertAt = Math.floor(Math.random() * (byPos[wave].length + 1));
        byPos[wave].splice(insertAt, 0, t);
    });

    // Concatenate in wave order
    state.currentPlayerDeck = WAVE_ORDER.flatMap(pos => byPos[pos]);
    state.currentWaveIndex = 0;
}

function allPlayersHaveAtLeastOne(pos) {
    return state.players.every(p => p.squad.some(s => s.player.pos === pos));
}

// ======================== AUCTION ========================
function renderAuction() {
    renderSidebarBudgets();
    showNextCard();
}

function renderSidebarBudgets() {
    const el = document.getElementById('sidebar-budgets');
    el.innerHTML = state.players.map(p => `
    <div class="player-budget-card">
      <div>
        <div class="pname"><span class="player-color" style="background:${p.color}"></span>${p.pname}</div>
        <div class="pskips">Skips: ${p.skips} | Plantilla: ${p.squad.length}</div>
      </div>
      <div class="pmoney">${fmtFull(p.budget)}</div>
    </div>`).join('');
}

function showNextCard() {
    if (state.currentCardIndex >= state.currentPlayerDeck.length) {
        checkAllSquadsComplete();
        return;
    }

    // Wave gating: make sure we don't jump to a new wave until all players
    // have at least one card from the current wave position
    const currentWavePos = WAVE_ORDER[state.currentWaveIndex];

    // Advance wave index if everyone already has one of the current position
    if (allPlayersHaveAtLeastOne(currentWavePos)) {
        const nextWaveIdx = state.currentWaveIndex + 1;
        if (nextWaveIdx < WAVE_ORDER.length) {
            state.currentWaveIndex = nextWaveIdx;
        }
    }

    const activeWavePos = WAVE_ORDER[state.currentWaveIndex];

    // If the next card in the deck is from a later wave but the current wave
    // isn't satisfied yet, find and bubble up the next card of the active wave
    let card = state.currentPlayerDeck[state.currentCardIndex];
    if (!card) { checkAllSquadsComplete(); return; }

    const isLaterWave = (pos) => {
        const cardWave = WAVE_ORDER.indexOf(pos);
        const activeWave = WAVE_ORDER.indexOf(activeWavePos);
        return cardWave > activeWave;
    };

    if (!card.isTrap && isLaterWave(card.pos)) {
        // Find the next card that belongs to the active wave (or a trap)
        const nextIdx = state.currentPlayerDeck.findIndex(
            (c, i) => i > state.currentCardIndex && (c.pos === activeWavePos || c.isTrap)
        );
        if (nextIdx !== -1) {
            const [moved] = state.currentPlayerDeck.splice(nextIdx, 1);
            state.currentPlayerDeck.splice(state.currentCardIndex, 0, moved);
            card = state.currentPlayerDeck[state.currentCardIndex];
        }
    }

    state.currentCard = card;
    const idx = state.currentCardIndex;
    const total = state.currentPlayerDeck.length;
    const waveLabel = { ARQ: 'Arqueros', DEF: 'Defensores', MED: 'Mediocampistas', DEL: 'Delanteros', DT: 'Directores Técnicos' };
    document.getElementById('auction-progress').textContent =
        `Oleada: ${waveLabel[activeWavePos] || activeWavePos} • Carta ${idx + 1} de ${total}`;

    // re-read card in case it was swapped above
    card = state.currentCard;
    document.getElementById('card-top').classList.remove('revealed');

    // Foto local con efecto silueta CSS
    const silContainer = document.getElementById('card-silhouette');
    const photoToShow = card.photo || PLAYERS_DB[Math.floor(Math.random() * PLAYERS_DB.filter(p => p.photo).length)].photo;
    if (photoToShow) {
        silContainer.innerHTML = `<img id="player-photo" src="${photoToShow}"
            style="width:100%;height:260px;object-fit:cover;object-position:top center;
                   filter:brightness(0.08) contrast(1.5);transition:filter 0.6s ease;display:block;"
            onerror="this.parentElement.innerHTML='<svg class=\'silhouette-svg\' id=\'silhouette-svg\' viewBox=\'0 0 120 200\' xmlns=\'http://www.w3.org/2000/svg\'></svg>';
                     const s=document.getElementById(\'silhouette-svg\');
                     s.innerHTML=SILHOUETTES[Math.floor(Math.random()*SILHOUETTES.length)];
                     s.style.cssText=\'color:#fff;filter:brightness(0);opacity:0.9;\';">`;
    } else {
        silContainer.innerHTML = `<svg class="silhouette-svg" id="silhouette-svg" viewBox="0 0 120 200" xmlns="http://www.w3.org/2000/svg"></svg>`;
        const svg = document.getElementById('silhouette-svg');
        svg.innerHTML = SILHOUETTES[Math.floor(Math.random() * SILHOUETTES.length)];
        svg.style.color = '#fff';
        svg.style.filter = 'brightness(0)';
        svg.style.opacity = '0.9';
    }

    document.getElementById('card-pos').textContent = card.pos;
    document.getElementById('card-rarity').textContent = card.rarity;
    document.getElementById('card-name').textContent = '???';
    document.getElementById('card-name').classList.add('hidden');
    document.getElementById('card-sub').textContent = card.isTrap ? '???' : card.league;
    document.getElementById('card-value').textContent = card.isTrap || card.isLegend ? '' : `Valor: ~${fmtFull(card.value)}`;
    document.getElementById('trap-banner').style.display = 'none';

    // Hints
    const hintsEl = document.getElementById('card-hints');
    const numHints = (card.rarity === '⭐⭐' || card.rarity === '🏆') ? 3 : 2;
    const selectedHints = card.hints.slice(0, numHints);
    hintsEl.innerHTML = selectedHints.map(h => `<div class="hint-item">🔍 ${h}</div>`).join('');

    // Buyer buttons
    renderBuyerBtns();
    state.selectedBuyer = null;
    document.getElementById('price-input').value = card.value || '';

    const skipInfo = document.getElementById('skip-info');
    skipInfo.textContent = state.players.map(p => `${p.pname}: ${p.skips} skips`).join(' | ');
}

function renderBuyerBtns() {
    const el = document.getElementById('buyer-btns');
    el.innerHTML = state.players.map(p => `
    <button class="buyer-btn" id="buyer-btn-${p.id}"
      style="color:${p.color};border-color:${p.color};"
      onclick="selectBuyer(${p.id})">
      ${p.pname}
    </button>`).join('');
}

function selectBuyer(id) {
    state.selectedBuyer = id;
    document.querySelectorAll('.buyer-btn').forEach(b => b.classList.remove('selected'));
    const btn = document.getElementById(`buyer-btn-${id}`);
    const p = state.players[id];
    btn.classList.add('selected');
    btn.style.background = p.color;
    btn.style.color = '#000';
}

function confirmPurchase() {
    if (state.selectedBuyer === null) { alert('Seleccioná quién compra el jugador'); return; }
    const buyer = state.players[state.selectedBuyer];
    const price = parseInt(document.getElementById('price-input').value) || state.currentCard.value || 0;
    if (price > buyer.budget) { alert(`${buyer.pname} no tiene suficiente presupuesto!`); return; }

    buyer.budget -= price;
    buyer.squad.push({ player: state.currentCard, price });
    revealCard(state.currentCard);

    addHistory(`${buyer.pname} compró <strong>${state.currentCard.name}</strong> por $${price}M`);
    showCardAcquired(state.currentCard, buyer);
    const continueBtn = document.getElementById('continue-btn');
    continueBtn.style.display = 'block';
}

function revealCard(card) {
    document.getElementById('card-top').classList.add('revealed');
    const photo = document.getElementById('player-photo');
    if (photo) {
        photo.style.filter = 'brightness(1) contrast(1)';
        photo.src = photo.src.replace('.png', '.jpg');
    } else {
        const svg = document.getElementById('silhouette-svg');
        if (svg) { svg.style.filter = 'none'; svg.style.opacity = '1'; }
    }
    document.getElementById('card-name').textContent = card.name;
    document.getElementById('card-name').classList.remove('hidden');
    document.getElementById('card-sub').textContent = `${card.club} • ${card.nation}`;
    if (card.isTrap) {
        document.getElementById('card-sub').textContent = card.trapReveal;
        document.getElementById('card-value').textContent = 'Vale $0';
    }
    if (card.isLegend) {
        document.getElementById('card-value').textContent = '🏆 LEYENDA';
    }
}

function skipAll() {
    // Check everyone can skip
    const canSkip = state.players.every(p => p.skips > 0);
    if (!canSkip) {
        // Find player without skips and force purchase
        const forced = state.players.find(p => p.skips === 0);
        alert(`${forced.pname} no tiene skips disponibles. Alguien debe comprar este jugador.`);
        return;
    }
    state.players.forEach(p => p.skips--);
    addHistory(`Todos skipean: <strong>${state.currentCard.name}</strong> descartado`);
    revealCard(state.currentCard);
    const continueBtn = document.getElementById('continue-btn');
    continueBtn.style.display = 'block';
}

function addHistory(text) {
    state.purchaseHistory.unshift(text);
    const el = document.getElementById('sidebar-history');
    el.innerHTML = state.purchaseHistory.slice(0, 20).map(h => `<div class="history-item">${h}</div>`).join('');
}

function checkAllSquadsComplete() {
    goTo('screen-squad');
    state.squadBuilderIndex = 0;
    renderSquadBuilder();
}

function nextCard() {
    document.getElementById('continue-btn').style.display = 'none';
    state.currentCardIndex++;
    renderSidebarBudgets();
    showNextCard();
}

// ======================== SQUAD BUILDER ========================
function renderSquadBuilder() {
    const p = state.players[state.squadBuilderIndex];
    renderSquadTabs();
    renderSquadList(p);
    renderPitch(p);
    renderBench(p);
    renderSquadInfo(p);
}

function renderSquadTabs() {
    const el = document.getElementById('squad-tabs');
    el.innerHTML = state.players.map((p, i) => `
    <button class="squad-tab ${i === state.squadBuilderIndex ? 'active' : ''}" onclick="switchSquadTab(${i})">
      <span class="player-color" style="background:${p.color}"></span> ${p.tname}
    </button>`).join('');
}

function switchSquadTab(i) {
    state.squadBuilderIndex = i;
    renderSquadBuilder();
}

function renderSquadList(p) {
    const el = document.getElementById('squad-list');
    const assignedIds = getAssignedIds(p);
    el.innerHTML = p.squad.map((s, idx) => {
        const inUse = assignedIds.includes(idx);
        return `<div class="squad-list-item ${inUse ? 'in-use' : ''}" onclick="${inUse ? '' : 'assignFromList(' + idx + ')'}">
      <div>
        <span class="sli-pos">${s.player.pos}</span>
        <span class="sli-name" style="margin-left:6px;">${s.player.name}</span>
        ${s.player.isLegend ? '<span class="tag tag-gold" style="margin-left:4px;">leyenda</span>' : ''}
        ${s.player.isTrap ? '<span class="tag tag-red" style="margin-left:4px;">⚠</span>' : ''}
      </div>
      <span class="sli-val">$${s.price}M</span>
    </div>`;
    }).join('') || '<div style="font-size:0.8rem;color:rgba(255,255,255,0.3);padding:0.5rem;">Sin jugadores adquiridos</div>';
}

function getAssignedIds(p) {
    const ids = [];
    Object.values(p.pitchLayout).forEach(id => { if (id !== null) ids.push(id); });
    return ids;
}

function renderPitch(p) {
    const tactic = p.tactics || '4-3-3';
    document.getElementById('tactic-select').value = tactic;
    const slots = getPitchSlots(tactic);
    const el = document.getElementById('pitch-slots');
    el.innerHTML = slots.map(s => {
        const assignedIdx = p.pitchLayout[s.key];
        const assigned = assignedIdx !== undefined ? p.squad[assignedIdx] : null;
        return `<div class="pitch-player ${assigned ? 'filled' : ''}"
      style="left:${s.x}%;top:${s.y}%;"
      onclick="clickPitchSlot('${s.key}')">
      <div class="pitch-player-circle">${assigned ? assigned.player.name.split(' ').pop().substring(0, 4).toUpperCase() : s.label}</div>
      <div class="pitch-player-name">${assigned ? assigned.player.name.split(' ').pop() : s.label}</div>
    </div>`;
    }).join('');
}

function getPitchSlots(tactic) {
    const def = TACTICS[tactic] || TACTICS['4-3-3'];
    const slots = [];
    // ARQ
    slots.push({ key: 'ARQ', label: 'ARQ', x: 50, y: 88 });
    // DEF
    const defCount = def.DEF;
    for (let i = 0; i < defCount; i++) {
        slots.push({ key: `DEF${i}`, label: 'DEF', x: 15 + i * (70 / (defCount - 1 || 1)), y: 72 });
    }
    // MED
    const medCount = def.MED;
    for (let i = 0; i < medCount; i++) {
        slots.push({ key: `MED${i}`, label: 'MED', x: 15 + i * (70 / (medCount - 1 || 1)), y: 50 });
    }
    // DEL
    const delCount = def.DEL;
    for (let i = 0; i < delCount; i++) {
        slots.push({ key: `DEL${i}`, label: 'DEL', x: 15 + i * (70 / (delCount - 1 || 1)), y: 22 });
    }
    return slots;
}

function clickPitchSlot(key) {
    const p = state.players[state.squadBuilderIndex];
    state.currentTacticSlot = key;
    const assigned = p.pitchLayout[key];
    if (assigned !== undefined) {
        // Unassign
        delete p.pitchLayout[key];
        renderPitch(p);
        renderSquadList(p);
        return;
    }
    // Show modal to assign
    showAssignModal(key, p);
}

function showAssignModal(key, p) {
    const assignedIds = getAssignedIds(p);
    const available = p.squad.map((s, idx) => ({ s, idx })).filter(({ s, idx }) => !assignedIds.includes(idx) && s.player.pos !== 'DT');
    const el = document.getElementById('modal-assign-slots');
    document.getElementById('modal-assign-title').textContent = `Asignar a ${key}`;
    el.innerHTML = available.length ? available.map(({ s, idx }) => `
    <div class="squad-list-item" style="cursor:pointer;" onclick="assignToSlot('${key}',${idx})">
      <div><span class="sli-pos">${s.player.pos}</span> <span class="sli-name" style="margin-left:6px;">${s.player.name}</span></div>
      <span class="sli-val">$${s.price}M</span>
    </div>`).join('') : '<div style="font-size:0.8rem;color:rgba(255,255,255,0.4);padding:0.5rem;">No hay jugadores disponibles</div>';
    document.getElementById('modal-assign').classList.add('open');
}

function assignToSlot(key, idx) {
    const p = state.players[state.squadBuilderIndex];
    p.pitchLayout[key] = idx;
    closeModal('modal-assign');
    renderPitch(p);
    renderSquadList(p);
    renderSquadInfo(p);
}

function assignFromList(idx) {
    const p = state.players[state.squadBuilderIndex];
    const player = p.squad[idx];
    if (player.player.pos === 'DT') { assignDTIdx(idx); return; }
    // Find first empty slot matching or any empty slot
    const slots = getPitchSlots(p.tactics);
    const emptySlot = slots.find(s => p.pitchLayout[s.key] === undefined);
    if (emptySlot) {
        p.pitchLayout[emptySlot.key] = idx;
        renderPitch(p);
        renderSquadList(p);
        renderSquadInfo(p);
    } else {
        showAssignModal('manual', p);
    }
}

function renderBench(p) {
    const assignedIds = getAssignedIds(p);
    const dtIdx = p.dtIdx;
    const benchSlots = document.getElementById('bench-slots');
    // 3 bench slots
    benchSlots.innerHTML = [0, 1, 2].map(i => {
        const b = p.bench ? p.bench[i] : null;
        const bIdx = p.benchIdx ? p.benchIdx[i] : undefined;
        if (b) return `<div class="bench-player assigned" onclick="removeBench(${i})">${b.player.name.split(' ').pop()}<br><span style="font-size:0.65rem;opacity:0.6">${b.player.pos}</span></div>`;
        return `<div class="bench-player" onclick="addBench(${i})">Suplente ${i + 1}</div>`;
    }).join('');

    // DT slot
    const dtEl = document.getElementById('dt-slot');
    if (p.dt) {
        dtEl.textContent = `DT: ${p.dt.player.name}`;
        dtEl.classList.add('assigned');
    } else {
        dtEl.textContent = 'Asignar DT';
        dtEl.classList.remove('assigned');
    }
}

function addBench(slot) {
    const p = state.players[state.squadBuilderIndex];
    const assignedIds = getAssignedIds(p);
    const benchIdx = (p.benchIdx || []).filter(x => x !== undefined);
    const available = p.squad.map((s, idx) => ({ s, idx })).filter(({ s, idx }) => !assignedIds.includes(idx) && !benchIdx.includes(idx) && s.player.pos !== 'DT');
    const el = document.getElementById('modal-assign-slots');
    document.getElementById('modal-assign-title').textContent = `Asignar Suplente ${slot + 1}`;
    el.innerHTML = available.map(({ s, idx }) => `
    <div class="squad-list-item" onclick="assignBench(${slot},${idx})">
      <div><span class="sli-pos">${s.player.pos}</span> <span class="sli-name" style="margin-left:6px;">${s.player.name}</span></div>
      <span class="sli-val">$${s.price}M</span>
    </div>`).join('') || '<div style="font-size:0.8rem;color:rgba(255,255,255,0.4);padding:0.5rem;">Sin jugadores disponibles</div>';
    document.getElementById('modal-assign').classList.add('open');
    state._benchSlot = slot;
}

function assignBench(slot, idx) {
    const p = state.players[state.squadBuilderIndex];
    if (!p.bench) p.bench = [];
    if (!p.benchIdx) p.benchIdx = [];
    p.bench[slot] = p.squad[idx];
    p.benchIdx[slot] = idx;
    closeModal('modal-assign');
    renderBench(p);
    renderSquadInfo(p);
}

function removeBench(slot) {
    const p = state.players[state.squadBuilderIndex];
    if (p.bench) { p.bench[slot] = null; }
    if (p.benchIdx) { p.benchIdx[slot] = undefined; }
    renderBench(p);
    renderSquadInfo(p);
}

function assignDT() {
    const p = state.players[state.squadBuilderIndex];
    const dtPlayers = p.squad.map((s, idx) => ({ s, idx })).filter(({ s }) => s.player.pos === 'DT');
    if (!dtPlayers.length) { alert('No tenés ningún DT en tu plantilla'); return; }
    const el = document.getElementById('modal-assign-slots');
    document.getElementById('modal-assign-title').textContent = 'Asignar Director Técnico';
    el.innerHTML = dtPlayers.map(({ s, idx }) => `
    <div class="squad-list-item" onclick="assignDTIdx(${idx})">
      <div><span class="sli-name">${s.player.name}</span></div>
      <span class="sli-val">$${s.price}M</span>
    </div>`).join('');
    document.getElementById('modal-assign').classList.add('open');
}

function assignDTIdx(idx) {
    const p = state.players[state.squadBuilderIndex];
    p.dt = p.squad[idx];
    closeModal('modal-assign');
    renderBench(p);
}

function changeTactic() {
    const p = state.players[state.squadBuilderIndex];
    p.tactics = document.getElementById('tactic-select').value;
    p.pitchLayout = {};
    renderPitch(p);
    renderSquadList(p);
}

function renderSquadInfo(p) {
    const el = document.getElementById('squad-info');
    const totalSpent = p.squad.reduce((a, s) => a + s.price, 0);
    const totalValue = p.squad.reduce((a, s) => a + (s.player.value || 0), 0);
    el.innerHTML = `
    <div class="squad-info-row"><span>Jugadores comprados</span><span>${p.squad.length}</span></div>
    <div class="squad-info-row"><span>Total gastado</span><span>${fmtFull(totalSpent)}</span></div>
    <div class="squad-info-row"><span>Presupuesto restante</span><span>${fmtFull(p.budget)}</span></div>
    <div class="squad-info-row"><span>Valor de mercado del equipo</span><span>${fmtFull(totalValue)}</span></div>
  `;
}

function squadDone() {
    if (!state.squadsDone.includes(state.squadBuilderIndex)) {
        state.squadsDone.push(state.squadBuilderIndex);
    }
    if (state.squadsDone.length < state.players.length) {
        const next = state.players.findIndex((_, i) => !state.squadsDone.includes(i));
        state.squadBuilderIndex = next;
        renderSquadBuilder();
        alert(`Turno de ${state.players[next].pname} para armar su equipo`);
    } else {
        // All done, go to market
        goTo('screen-market');
        renderMarket();
    }
}

// ======================== MARKET ========================
function renderMarket() {
    const el = document.getElementById('market-content');
    el.innerHTML = state.players.map(p => `
    <div style="margin-bottom:1.5rem;">
      <div style="font-family:'Oswald',sans-serif;font-size:1rem;font-weight:700;color:${p.color};margin-bottom:0.75rem;">
        ${p.tname} (${p.pname}) — Restante: ${fmtFull(p.budget)} | Transferencias usadas: ${p.transfersUsed || 0}/2
      </div>
      ${renderMarketPlayerOffers(p)}
    </div>`).join('');
}

function renderMarketPlayerOffers(p) {
    if (!p.squad.length) return '<div style="font-size:0.8rem;color:rgba(255,255,255,0.3);">Sin jugadores</div>';
    return `<div style="display:flex;flex-wrap:wrap;gap:0.5rem;">` +
        p.squad.map((s, idx) => `
      <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:0.5rem 0.75rem;font-size:0.8rem;min-width:130px;">
        <div style="font-family:'Oswald',sans-serif;font-weight:600;">${s.player.name}</div>
        <div style="color:rgba(255,255,255,0.4);font-size:0.7rem;">${s.player.pos} • $${s.price}M</div>
        ${state.players.filter(op => op.id !== p.id && (op.transfersUsed || 0) < 2).map(op => `
          <button class="btn btn-outline btn-sm" style="margin-top:4px;font-size:0.65rem;padding:2px 6px;" onclick="makeOffer(${op.id},${p.id},${idx})">
            Oferta de ${op.pname}
          </button>`).join('')}
      </div>`).join('') + '</div>';
}

let _pendingOffer = null;
function makeOffer(fromId, toId, playerIdx) {
    const from = state.players[fromId];
    const to = state.players[toId];
    const player = to.squad[playerIdx];
    _pendingOffer = { fromId, toId, playerIdx };
    document.getElementById('modal-offer-content').innerHTML = `
    <p style="margin-bottom:0.75rem;font-size:0.85rem;">
      <strong style="color:var(--gold)">${from.pname}</strong> quiere fichar a <strong>${player.player.name}</strong> de <strong style="color:${to.color}">${to.tname}</strong>
    </p>
    <div class="field-group">
      <label>Monto de la oferta (M)</label>
      <input type="number" id="offer-amount" placeholder="Ej: 80" value="${player.price}" style="background:rgba(255,255,255,0.06);border:1px solid rgba(245,200,66,0.3);border-radius:4px;color:var(--white);font-family:'Inter',sans-serif;font-size:0.9rem;padding:0.5rem;width:100%;outline:none;">
    </div>
    <p style="font-size:0.75rem;color:rgba(255,255,255,0.4);margin-top:0.5rem;">Presupuesto de ${from.pname}: ${fmtFull(from.budget)}</p>`;
    document.getElementById('modal-offer').classList.add('open');
}

function submitOffer() {
    if (!_pendingOffer) return;
    const { fromId, toId, playerIdx } = _pendingOffer;
    const from = state.players[fromId];
    const to = state.players[toId];
    const amount = parseInt(document.getElementById('offer-amount').value) || 0;
    if (amount > from.budget) { alert(`${from.pname} no tiene ese presupuesto`); return; }
    const player = to.squad[playerIdx];
    const accept = confirm(`${to.pname}: ¿Aceptás vender ${player.player.name} por $${amount}M a ${from.pname}?`);
    if (accept) {
        from.budget -= amount;
        to.budget += amount;
        from.squad.push({ player: player.player, price: amount });
        to.squad.splice(playerIdx, 1);
        from.transfersUsed = (from.transfersUsed || 0) + 1;
        to.transfersUsed = (to.transfersUsed || 0) + 1;
        addHistory(`🔄 ${from.pname} fichó a <strong>${player.player.name}</strong> de ${to.pname} por $${amount}M`);
    }
    closeModal('modal-offer');
    renderMarket();
}

function goToPresentation() {
    goTo('screen-presentation');
    renderPresentation();
}

// ======================== PRESENTATION ========================
function renderPresentation() {
    const grid = document.getElementById('teams-grid');
    grid.innerHTML = state.players.map(p => {
        const titulares = Object.values(p.pitchLayout || {}).map(idx => p.squad[idx]).filter(Boolean);
        const totalValue = p.squad.reduce((a, s) => a + (s.player.value || 0), 0);
        const totalSpent = p.squad.reduce((a, s) => a + s.price, 0);
        return `<div class="team-card">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:0.25rem;">
        <span class="player-color" style="background:${p.color};width:18px;height:18px;border-radius:50%;display:inline-block;"></span>
        <div class="team-card-name">${p.tname}</div>
      </div>
      <div class="team-card-manager">DT: ${p.dt ? p.dt.player.name : 'Sin DT'}</div>
      <div class="team-card-tactic">${p.tactics || 'Sin táctica'}</div>
      <div class="team-card-players">
        ${p.squad.slice(0, 8).map(s => `<div>${s.player.pos}: ${s.player.name}</div>`).join('')}
        ${p.squad.length > 8 ? `<div style="color:rgba(255,255,255,0.4);">...y ${p.squad.length - 8} más</div>` : ''}
      </div>
      <div class="team-card-value">Valor total: ${fmtFull(totalValue)}<br><span style="font-size:0.85rem;color:rgba(255,255,255,0.5);">Gastado: ${fmtFull(totalSpent)} | Restante: ${fmtFull(p.budget)}</span></div>
    </div>`;
    }).join('');

    renderVoteSection();
}

function renderVoteSection() {
    const el = document.getElementById('vote-btns');
    el.innerHTML = state.players.map(p => `
    <button class="btn ${state.votes[p.id] !== undefined ? 'btn-green' : 'btn-outline'}" onclick="voteFor(${p.id})" style="border-color:${p.color};color:${p.color};">
      ${p.tname} — ${Object.values(state.votes).filter(v => v === p.id).length} voto(s)
    </button>`).join('');

    const voteCounts = {};
    state.players.forEach(p => voteCounts[p.id] = 0);
    Object.values(state.votes).forEach(v => voteCounts[v]++);
    const maxVotes = Math.max(...Object.values(voteCounts));
    const winners = state.players.filter(p => voteCounts[p.id] === maxVotes && maxVotes > 0);

    const statusEl = document.getElementById('vote-status');
    if (Object.keys(state.votes).length === state.players.length) {
        if (winners.length === 1) {
            statusEl.innerHTML = `<div class="winner-banner">¡Ganador: ${winners[0].tname}! 🏆</div>`;
        } else {
            statusEl.textContent = '¡Empate! Que decida la IA...';
        }
    } else {
        statusEl.textContent = `${Object.keys(state.votes).length}/${state.players.length} votos emitidos`;
    }
}

function voteFor(teamId) {
    // Current voter = first who hasn't voted
    const voter = state.players.find(p => state.votes[p.id] === undefined);
    if (!voter) return;
    if (voter.id === teamId) { alert('No podés votar por tu propio equipo'); return; }
    state.votes[voter.id] = teamId;
    renderVoteSection();
}

async function aiJudge() {
    const verdictEl = document.getElementById('ai-verdict');
    verdictEl.style.display = 'block';
    verdictEl.innerHTML = '<div class="ai-verdict-title">Analizando equipos<span class="loading-dots"></span></div>';

    const teamsInfo = state.players.map(p => {
        const totalValue = p.squad.reduce((a, s) => a + (s.player.value || 0), 0);
        const players = p.squad.map(s => `${s.player.pos}: ${s.player.name} (${s.player.club})`).join(', ');
        return `Equipo: ${p.tname} | DT: ${p.dt?.player.name || 'ninguno'} | Táctica: ${p.tactics} | Plantilla: ${players} | Valor total estimado: $${totalValue}M`;
    }).join('\n\n');

    try {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 1000,
                messages: [{
                    role: 'user',
                    content: `Sos un experto en fútbol. Analizá estos equipos armados en una subasta futbolera y elegí el mejor. Considerá la calidad de los jugadores, el equilibrio táctico, el DT y la cohesión del equipo. Sé directo y apasionado. Acá están los equipos:\n\n${teamsInfo}\n\nElegí el ganador, explicá por qué en 3-4 oraciones y luego dale una puntuación del 1 al 10 a cada equipo.`
                }]
            })
        });
        const data = await res.json();
        const text = data.content?.map(c => c.text || '').join('') || 'No se pudo obtener el veredicto.';
        verdictEl.innerHTML = `<div class="ai-verdict-title">⚽ Veredicto de la IA</div><div style="white-space:pre-wrap;">${text}</div>`;
    } catch (e) {
        verdictEl.innerHTML = '<div class="ai-verdict-title">Error</div><div>No se pudo conectar con la IA. Votad entre ustedes.</div>';
    }
}

// ======================== CARD ACQUIRED ANIMATION ========================
function showCardAcquired(card, buyer) {
    const rarityColor = {
        '⭐⭐': '#f5c842',
        '⭐': '#c0a030',
        '🏆': '#a0c8ff',
        '🃏': '#e74c3c',
        '': '#888',
    };
    const color = rarityColor[card.rarity] || '#888';

    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position:fixed;inset:0;background:rgba(0,0,0,0.85);
        z-index:200;display:flex;flex-direction:column;
        align-items:center;justify-content:center;
        animation:fadeIn 0.2s ease;cursor:pointer;
    `;
    overlay.innerHTML = `
        <div style="
            background:linear-gradient(145deg,#0f2218,#071510);
            border:2px solid ${color};border-radius:16px;
            width:240px;text-align:center;overflow:hidden;
            animation:cardPop 0.4s cubic-bezier(0.34,1.56,0.64,1);
            box-shadow:0 0 40px ${color}44;
        ">
            <div style="background:${color}22;padding:1rem 0.5rem 0.5rem;">
                <div style="font-family:'Bebas Neue',cursive;font-size:3rem;color:${color};line-height:1;">
                    ${card.value || '?'}
                </div>
                <div style="font-family:'Oswald',sans-serif;font-size:0.7rem;letter-spacing:0.15em;color:${color};opacity:0.8;">${card.pos}</div>
            </div>
            <div style="padding:1rem;">
                <div style="font-family:'Bebas Neue',cursive;font-size:1.5rem;color:#f5f5f0;letter-spacing:0.05em;line-height:1.1;">${card.name}</div>
                <div style="font-size:0.75rem;color:rgba(255,255,255,0.4);margin-top:4px;">${card.club}</div>
                <div style="font-size:0.7rem;color:rgba(255,255,255,0.3);">${card.league} • ${card.nation}</div>
                <div style="margin-top:0.75rem;font-family:'Oswald',sans-serif;font-size:0.85rem;font-weight:600;color:${buyer.color};">
                    Comprado por ${buyer.pname}
                </div>
                <div style="font-family:'Oswald',sans-serif;font-size:0.75rem;color:rgba(255,255,255,0.3);">$${card.price !== undefined ? card.price : '?'}M</div>
    
                ${card.isLegend ? `<div style="color:#a0c8ff;font-size:0.75rem;margin-top:6px;font-family:'Oswald',sans-serif;">🏆 LEYENDA</div>` : ''}
            </div>
        </div>
        <div style="margin-top:1.25rem;font-size:0.8rem;color:rgba(255,255,255,0.35);font-family:'Oswald',sans-serif;letter-spacing:0.1em;">Tocá para continuar</div>
    `;
    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
}

// ======================== MY SQUAD MODAL ========================
function openMySquad() {
    if (state.players.length === 1) {
        state._viewingPlayer = 0;
    } else {
        const options = state.players.map((p, i) => `${i + 1}: ${p.pname} (${p.tname})`).join('\n');
        const choice = prompt(`¿De quién querés ver la plantilla?\n${options}\n\nIngresá el número:`);
        const idx = parseInt(choice) - 1;
        if (isNaN(idx) || idx < 0 || idx >= state.players.length) return;
        state._viewingPlayer = idx;
    }
    renderMySquadModal(state.players[state._viewingPlayer]);
    document.getElementById('modal-my-squad').classList.add('open');
}

function renderMySquadModal(p) {
    document.getElementById('my-squad-title').textContent = `${p.tname} — ${p.pname}`;
    document.getElementById('my-squad-tactic').value = p.tactics || '4-3-3';

    // Pitch slots
    const slots = getPitchSlots(p.tactics || '4-3-3');
    const pitchEl = document.getElementById('my-squad-pitch-slots');
    pitchEl.innerHTML = slots.map(s => {
        const assignedIdx = p.pitchLayout ? p.pitchLayout[s.key] : undefined;
        const assigned = assignedIdx !== undefined ? p.squad[assignedIdx] : null;
        const isPending = state._mySquadPendingSlot && !assigned;
        return `<div class="pitch-player ${assigned ? 'filled' : ''} ${isPending ? 'pending-slot' : ''}"
            style="left:${s.x}%;top:${s.y}%;"
            onclick="mySquadClickSlot('${s.key}')">
            <div class="pitch-player-circle">
                ${assigned ? assigned.player.name.split(' ').pop().substring(0, 4).toUpperCase() : s.label}
            </div>
            <div class="pitch-player-name">
                ${assigned ? assigned.player.name.split(' ').pop() : s.label}
            </div>
        </div>`;
    }).join('');

    // Cards panel — FIFA-style mini cards
    const cardsEl = document.getElementById('my-squad-cards');
    const assignedIds = p.pitchLayout ? Object.values(p.pitchLayout) : [];
    const rarityColor = { '⭐⭐': '#f5c842', '⭐': '#c0a030', '🏆': '#a0c8ff', '🃏': '#e74c3c', '': '#555' };

    cardsEl.innerHTML = p.squad.map((s, idx) => {
        const inUse = assignedIds.includes(idx);
        const color = rarityColor[s.player.rarity] || '#555';
        const isPending = !!state._mySquadPendingSlot;
        return `<div onclick="mySquadAssignCard(${idx})" style="
            display:flex;align-items:center;gap:10px;
            background:${inUse ? 'rgba(245,200,66,0.08)' : 'rgba(255,255,255,0.04)'};
            border:1px solid ${inUse ? color : (isPending && !inUse ? 'rgba(245,200,66,0.5)' : 'rgba(255,255,255,0.08)')};
            border-radius:8px;padding:0.5rem 0.75rem;
            cursor:${inUse ? 'default' : 'pointer'};
            transition:border 0.15s;
        ">
            <div style="
                width:40px;height:40px;border-radius:6px;flex-shrink:0;
                background:${color}22;border:1px solid ${color}66;
                display:flex;flex-direction:column;align-items:center;justify-content:center;
                font-family:'Bebas Neue',cursive;
            ">
                <div style="font-size:1rem;color:${color};line-height:1;">${s.player.value || '?'}</div>
                <div style="font-size:0.5rem;color:${color};opacity:0.7;letter-spacing:0.05em;">${s.player.pos}</div>
            </div>
            <div style="flex:1;min-width:0;">
                <div style="font-family:'Oswald',sans-serif;font-size:0.85rem;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${s.player.name}</div>
                <div style="font-size:0.7rem;color:rgba(255,255,255,0.4);">${s.player.club}</div>
                <div style="font-size:0.65rem;color:rgba(255,255,255,0.25);">$${s.price}M pagado</div>
            </div>
            ${inUse ? `<span class="tag tag-gold">titular</span>` : ''}
            ${s.player.isTrap ? `<span class="tag tag-red">⚠</span>` : ''}
            ${s.player.isLegend ? `<span class="tag tag-blue">leyenda</span>` : ''}
        </div>`;
    }).join('') || '<div style="font-size:0.8rem;color:rgba(255,255,255,0.3);padding:0.5rem;">Todavía no compraste jugadores</div>';

    if (state._mySquadPendingSlot) {
        const hint = document.createElement('div');
        hint.style.cssText = 'font-size:0.8rem;color:var(--gold);text-align:center;padding:0.5rem 0;font-family:Oswald,sans-serif;letter-spacing:0.1em;';
        hint.textContent = `Seleccioná un jugador para asignar al slot ${state._mySquadPendingSlot}`;
        cardsEl.prepend(hint);
    }
}

function mySquadChangeTactic() {
    const p = state.players[state._viewingPlayer || 0];
    p.tactics = document.getElementById('my-squad-tactic').value;
    p.pitchLayout = {};
    state._mySquadPendingSlot = null;
    renderMySquadModal(p);
}

function mySquadClickSlot(key) {
    const p = state.players[state._viewingPlayer || 0];
    if (!p.pitchLayout) p.pitchLayout = {};

    // If already filled, unassign
    if (p.pitchLayout[key] !== undefined) {
        delete p.pitchLayout[key];
        state._mySquadPendingSlot = null;
        renderMySquadModal(p);
        return;
    }

    // Set pending slot so next card click assigns to it
    state._mySquadPendingSlot = key;
    renderMySquadModal(p);
}

function mySquadAssignCard(idx) {
    const p = state.players[state._viewingPlayer || 0];
    if (!p.pitchLayout) p.pitchLayout = {};
    if (!state._mySquadPendingSlot) return;

    const assignedIds = Object.values(p.pitchLayout);
    if (assignedIds.includes(idx)) return; // already in use

    p.pitchLayout[state._mySquadPendingSlot] = idx;
    state._mySquadPendingSlot = null;
    renderMySquadModal(p);
}

// ======================== INIT ========================
setPlayerCount(2);
renderPlayersForm();