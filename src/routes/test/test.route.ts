import { Hono } from "hono";

import { convertDataToJSONL } from "../../scripts/convertDataToJSONL.script";
import { scrapeBlogs } from "../../scripts/scrapeUrls.script";
import { generateResumeBlogJsonLFile } from "../../scripts/convertJsontoJsonl.script";

// Create a typed Hono instance
const testRoute = new Hono();

const blogUrls = [
  "https://www.investopedia.com/terms/m/mutualfund.asp",
  "https://www.icicibank.com/blogs/mutual-fund/types-of-mutual-funds-in-india",
  "https://groww.in/p/types-of-mutual-funds",
  "https://economictimes.indiatimes.com/mf/analysis/top-10-mutual-funds-to-invest-in-april-2025/articleshow/119892885.cms?from=mdr",
  "https://www.axisbank.com/progress-with-us-articles/money-matters/save-invest/difference-between-stocks-and-mutual-funds",
  "https://groww.in/p/beginners-guide-mutual-funds",
  "https://www.kotak.com/en/stories-in-focus/mutual-funds/best-sip-for-long-term.html",
  "https://www.bajajfinserv.in/investments/equity-mutual-funds-vs-debt-mutual-funds#:~:text=Equity%20funds%20have%20the%20potential,risk%20compared%20to%20equity%20funds.",
  "https://www.bankrate.com/investing/stock-market-basics-for-beginners/",
  "https://www.investopedia.com/articles/trading/10/top-ten-rules-for-trading.asp",
  "https://www.investopedia.com/articles/active-trading/101713/technical-vs-fundamental-investing-friends-or-foes.asp#:~:text=Technical%20analysis%20is%20primarily%20used,buy%2Dand%2Dhold%20strategies.",
  "https://www.angelone.in/knowledge-center/how-to-read-stock-charts",
  "https://thekalculators.com.au/guide-for-building-wealth-through-financial-planning/",
  "https://www.zeebiz.com/personal-finance/photo-gallery-top-10-financial-tips-for-young-adults-in-2025-money-management-smart-investments-337196/avoid-unnecessary-expense-337230",
  "https://www.icicibank.com/blogs/investment/setting-financial-goals-6-simple-tips-to-setting-financial-goals-for-your-future",
  "https://www.gripinvest.in/blog/fd-alternatives",
  "https://www.investopedia.com/terms/c/compoundinterest.asp",
  "https://www.investopedia.com/how-to-rebalance-your-portfolio-7973806#:~:text=The%20goal%20of%20rebalancing%20is,to%20rebalance%20their%20portfolios%20annually.",
  "https://www.investopedia.com/terms/d/dollarcostaveraging.asp",
  "https://www.nasdaq.com/articles/psychology-money-understanding-emotional-side-finances-and-how-it-affects-your-decisions#:~:text=Emotions%20like%20fear%2C%20anxiety%2C%20guilt,and%20achieve%20your%20financial%20goals.",
  "https://www.investopedia.com/articles/investing/061916/what-best-measure-companys-financial-health.asp",
  "https://www.bajajfinserv.in/investments/mutual-funds-vs-etfs#:~:text=ETFs%20are%20passively%20managed%2C%20mirroring,but%20potentially%20delivering%20superior%20returns.",
  "https://economictimes.indiatimes.com/mf/analysis/why-sips-are-a-smart-way-to-build-wealth/articleshow/118642784.cms?from=mdr",
  "https://www.investopedia.com/terms/i/indexfund.asp",
  "https://www.bankrate.com/investing/crypto-vs-stocks/",
  "https://www.investopedia.com/ask/answers/what-is-inflation-and-how-should-it-affect-investing/",
  "https://www.investopedia.com/articles/personal-finance/050815/what-do-financial-advisers-do.asp",
  "https://www.investopedia.com/ask/answers/04/032604.asp#:~:text=Net%20asset%20value%20(NAV)%20represents%20a%20fund's%20per%2Dshare,the%20number%20of%20outstanding%20shares.",
  "https://www.bajajamc.com/knowledge-centre/decoding-the-numbers-mastering-the-art-of-reading-mutual-fund-factsheets#:~:text=When%20reading%20a%20factsheet%20of,risk%20tolerance%20and%20investment%20goals.",
  "https://www.equitymaster.com/detail.asp?date=02/14/2025&story=4&title=5-Subtle-Investing-Mistakes-You-Should-Not-Repeat-in-2025-And-Beyond",
  "https://www.investopedia.com/terms/c/cagr.asp",
  "https://www.miraeassetmf.co.in/knowledge-center/how-to-use-mutual-funds-for-children-s-education-planning#:~:text=Mutual%20Funds%20are%20ideal%20for%20education%20planning&text=If%20you%20investment%20Rs%2030%2C000,risk%20appetites%20and%20investment%20needs.",
  "https://groww.in/blog/taxation-in-mutual-funds",
  "https://www.investopedia.com/terms/f/financial-independence-retire-early-fire.asp",
];

const blogUrls1 = blogUrls.slice(0, 11);
const blogUrls2 = blogUrls.slice(11, 21);
const blogUrls3 = blogUrls.slice(21, 35);

testRoute.get("/", async (c) => {
  const message = generateResumeBlogJsonLFile();
  return c.json({ message });
});

export default testRoute;
