// Fonction serverless Vercel : va chercher en direct le nombre de joueurs
// sur le serveur FiveM et le renvoie au site (évite les soucis de CORS
// puisque c'est le serveur qui interroge FiveM, pas le navigateur du visiteur).
//
// Code du serveur tiré de https://cfx.re/join/e66a7ba
// Pour changer de serveur, remplace juste la valeur ci-dessous.
const SERVER_CODE = 'e66a7ba';

module.exports = async (req, res) => {
  // Petit cache de 15s côté Vercel pour éviter de spammer l'API FiveM
  // si beaucoup de visiteurs arrivent en même temps.
  res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate=30');
  res.setHeader('Content-Type', 'application/json');

  try {
    const upstream = await fetch(
      `https://servers-frontend.fivem.net/api/servers/single/${SERVER_CODE}`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
          Accept: 'application/json',
        },
      }
    );

    if (!upstream.ok) {
      throw new Error('Réponse FiveM invalide: ' + upstream.status);
    }

    const json = await upstr
