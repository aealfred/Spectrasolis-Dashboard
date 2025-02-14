#install dependencies
#pip install beautifulsoup4 requests flask

import requests 
from bs4 import beautifulsoup4

def scrape_tst1();

    url = https://laspace.lsu.edu/hasp/xml/data_adc.php?py=2025
    response = requests.get(url)

    soup = BeautifulSoup(response.text, 'html.parser')

    paragraphs = soup.find_all('p')
    scraped_data = [p.get_text(strip=True) for p in paragraphs]

    return scraped_data
