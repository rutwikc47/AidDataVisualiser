function vis3(data3, data, div) {

  const countAbbr = ({
    'AFGHANISTAN' : 'AF',
    // 'AKROTIRI' : '*',
    'ALBANIA' : 'AL',
    'ALGERIA' : 'DZ',
    'AMERICAN SAMOA' : 'AS',
    'ANDORRA' : 'AD',
    'ANGOLA' : 'AO',
    'ANGUILLA' : 'AI',
    'ANTARCTICA' : 'AQ',
    'ANTIGUA AND BARBUDA' : 'AG',
    'ARGENTINA' : 'AR',
    'ARMENIA' : 'AM',
    'ARUBA' : 'AW',
    // 'ASHMORE AND CARTIER ISLANDS' : '*',
    'AUSTRALIA' : 'AU',
    'AUSTRIA' : 'AT',
    'AZERBAIJAN' : 'AZ',
    'BAHAMAS, THE' : 'BS',
    'BAHRAIN' : 'BH',
    // 'BAKER ISLAND' : '*',
    'BANGLADESH' : 'BD',
    'BARBADOS' : 'BB',
    // 'BASSAS DA INDIA' : '*',
    'BELARUS' : 'BY',
    'BELGIUM' : 'BE',
    'BELIZE' : 'BZ',
    'BENIN' : 'BJ',
    'BERMUDA' : 'BM',
    'BHUTAN' : 'BT',
    'BOLIVIA' : 'BO',
    'BOSNIA AND HERZEGOVINA' : 'BA',
    'BOTSWANA' : 'BW',
    'BOUVET ISLAND' : 'BV',
    'BRAZIL' : 'BR',
    'BRITISH INDIAN OCEAN TERRITORY' : 'IO',
    'BRUNEI' : 'BN',
    'BULGARIA' : 'BG',
    'BURKINA FASO' : 'BF',
    'BURMA' : 'MM',
    'BURUNDI' : 'BI',
    'CAMBODIA' : 'KH',
    'CAMEROON' : 'CM',
    'CANADA' : 'CA',
    'CAPE VERDE' : 'CV',
    'CAYMAN ISLANDS' : 'KY',
    'CENTRAL AFRICAN REPUBLIC' : 'CF',
    'CHAD' : 'TD',
    'CHILE' : 'CL',
    'CHINA' : 'CN',
    'CHRISTMAS ISLAND' : 'CX',
    // 'CLIPPERTON ISLAND' : '*',
    'COCOS (KEELING) ISLANDS' : 'CC',
    'COLOMBIA' : 'CO',
    'COMOROS' : 'KM',
    'CONGO (BRAZZAVILLE) ' : 'CG',
    'CONGO (KINSHASA)' : 'CD',
    'COOK ISLANDS' : 'CK',
    // 'CORAL SEA ISLANDS' : '*',
    'COSTA RICA' : 'CR',
    'CÔTE D’IVOIRE' : 'CI',
    'CROATIA' : 'HR',
    'CUBA' : 'CU',
    'CURAÇAO' : 'CW',
    'CYPRUS' : 'CY',
    'CZECH REPUBLIC' : 'CZ',
    'DENMARK' : 'DK',
    // 'DHEKELIA' : '*',
    'DJIBOUTI' : 'DJ',
    'DOMINICA' : 'DM',
    'DOMINICAN REPUBLIC' : 'DO',
    'ECUADOR' : 'EC',
    'EGYPT' : 'EG',
    'EL SALVADOR' : 'SV',
    'EQUATORIAL GUINEA' : 'GQ',
    'ERITREA' : 'ER',
    'ESTONIA' : 'EE',
    'ETHIOPIA' : 'ET',
    // 'ETOROFU, HABOMAI, KUNASHIRI, AND SHIKOTAN ISLANDS' : '*',
    // 'EUROPA ISLAND' : '*',
    'FALKLAND ISLANDS (ISLAS MALVINAS)' : 'FK',
    'FAROE ISLANDS' : 'FO',
    'FIJI' : 'FJ',
    'FINLAND' : 'FI',
    'FRANCE' : 'FR',
    'FRENCH GUIANA' : 'GF',
    'FRENCH POLYNESIA' : 'PF',
    'FRENCH SOUTHERN AND ANTARCTIC LANDS' : 'TF',
    'GABON' : 'GA',
    'GAMBIA, THE' : 'GM',
    // 'GAZA STRIP' : '*',
    'GEORGIA' : 'GE',
    'GERMANY' : 'DE',
    'GHANA' : 'GH',
    'GIBRALTAR' : 'GI',
    // 'GLORIOSO ISLANDS' : '*',
    'GREECE' : 'GR',
    'GREENLAND' : 'GL',
    'GRENADA' : 'GD',
    'GUADELOUPE' : 'GP',
    'GUAM' : 'GU',
    'GUATEMALA' : 'GT',
    'GUERNSEY' : 'GG',
    'GUINEA' : 'GN',
    'GUINEA-BISSAU' : 'GW',
    'GUYANA' : 'GY',
    'HAITI' : 'HT',
    'HEARD ISLAND AND MCDONALD ISLANDS' : 'HM',
    'HONDURAS' : 'HN',
    'HONG KONG' : 'HK',
    // 'HOWLAND ISLAND' : '*',
    'HUNGARY' : 'HU',
    'ICELAND' : 'IS',
    'INDIA' : 'IN',
    'INDONESIA' : 'ID',
    'IRAN' : 'IR',
    'IRAQ' : 'IQ',
    'IRELAND' : 'IE',
    'ISLE OF MAN' : 'IM',
    'ISRAEL' : 'IL',
    'ITALY' : 'IT',
    'JAMAICA' : 'JM',
    // 'JAN MAYEN' : '*',
    'JAPAN' : 'JP',
    // 'JARVIS ISLAND' : '*',
    'JERSEY' : 'JE',
    // 'JOHNSTON ATOLL' : '*',
    'JORDAN' : 'JO',
    // 'JUAN DE NOVA ISLAND' : '*',
    'KAZAKHSTAN' : 'KZ',
    'KENYA' : 'KE',
    // 'KINGMAN REEF' : '*',
    'KIRIBATI' : 'KI',
    'KOREA, NORTH' : 'KP',
    'KOREA' : 'KR',
    // 'KOSOVO' : '*',
    'KUWAIT' : 'KW',
    'KYRGYZSTAN' : 'KG',
    'LAOS' : 'LA',
    'LATVIA' : 'LV',
    'LEBANON' : 'LB',
    'LESOTHO' : 'LS',
    'LIBERIA' : 'LR',
    'LIBYA' : 'LY',
    'LIECHTENSTEIN' : 'LI',
    'LITHUANIA' : 'LT',
    'LUXEMBOURG' : 'LU',
    'MACAU' : 'MO',
    'MACEDONIA' : 'MK',
    'MADAGASCAR' : 'MG',
    'MALAWI' : 'MW',
    'MALAYSIA' : 'MY',
    'MALDIVES' : 'MV',
    'MALI' : 'ML',
    'MALTA' : 'MT',
    'MARSHALL ISLANDS' : 'MH',
    'MARTINIQUE' : 'MQ',
    'MAURITANIA' : 'MR',
    'MAURITIUS' : 'MU',
    'MAYOTTE' : 'YT',
    'MEXICO' : 'MX',
    'MICRONESIA, FEDERATED STATES OF' : 'FM',
    // 'MIDWAY ISLANDS' : '*',
    'MOLDOVA' : 'MD',
    'MONACO' : 'MC',
    'MONGOLIA' : 'MN',
    'MONTENEGRO' : 'ME',
    'MONTSERRAT' : 'MS',
    'MOROCCO' : 'MA',
    'MOZAMBIQUE' : 'MZ',
    'NAMIBIA' : 'NA',
    'NAURU' : 'NR',
    // 'NAVASSA ISLAND' : '*',
    'NEPAL' : 'NP',
    'NETHERLANDS' : 'NL',
    'NEW CALEDONIA' : 'NC',
    'NEW ZEALAND' : 'NZ',
    'NICARAGUA' : 'NI',
    'NIGER' : 'NE',
    'NIGERIA' : 'NG',
    'NIUE' : 'NU',
    'NORFOLK ISLAND' : 'NF',
    'NORTHERN MARIANA ISLANDS' : 'MP',
    'NORWAY' : 'NO',
    'OMAN' : 'OM',
    'PAKISTAN' : 'PK',
    'PALAU' : 'PW',
    // 'PALMYRA ATOLL' : '*',
    'PANAMA' : 'PA',
    'PAPUA NEW GUINEA' : 'PG',
    // 'PARACEL ISLANDS' : '*',
    'PARAGUAY' : 'PY',
    'PERU' : 'PE',
    'PHILIPPINES' : 'PH',
    'PITCAIRN ISLANDS' : 'PN',
    'POLAND' : 'PL',
    'PORTUGAL' : 'PT',
    'PUERTO RICO' : 'PR',
    'QATAR' : 'QA',
    'REUNION' : 'RE',
    'ROMANIA' : 'RO',
    'RUSSIA' : 'RU',
    'RWANDA' : 'RW',
    'SAINT BARTHELEMY' : 'BL',
    'SAINT HELENA, ASCENSION, AND TRISTAN DA CUNHA' : 'SH',
    'SAINT KITTS AND NEVIS' : 'KN',
    'SAINT LUCIA' : 'LC',
    'SAINT MARTIN' : 'MF',
    'SAINT PIERRE AND MIQUELON' : 'PM',
    'SAINT VINCENT AND THE GRENADINES' : 'VC',
    'SAMOA' : 'WS',
    'SAN MARINO' : 'SM',
    'SAO TOME AND PRINCIPE' : 'ST',
    'SAUDI ARABIA' : 'SA',
    'SENEGAL' : 'SN',
    'SERBIA' : 'RS',
    'SEYCHELLES' : 'SC',
    'SIERRA LEONE' : 'SL',
    'SINGAPORE' : 'SG',
    'SINT MAARTEN' : 'SX',
    'SLOVAKIA' : 'SK',
    'SLOVENIA' : 'SI',
    'SLOVAK REPUBLIC' : 'SVK',
    'SOLOMON ISLANDS' : 'SB',
    'SOMALIA' : 'SO',
    'SOUTH AFRICA' : 'ZA',
    'SOUTH GEORGIA AND SOUTH SANDWICH ISLANDS' : 'GS',
    'SOUTH SUDAN' : 'SS',
    'SPAIN' : 'ES',
    // 'SPRATLY ISLANDS' : '*',
    'SRI LANKA' : 'LK',
    'SUDAN' : 'SD',
    'SURINAME' : 'SR',
    // 'SVALBARD' : '*',
    'SWAZILAND' : 'SZ',
    'SWEDEN' : 'SE',
    'SWITZERLAND' : 'CH',
    'SYRIA' : 'SY',
    'TAIWAN' : 'TW',
    'TAJIKISTAN' : 'TJ',
    'TANZANIA' : 'TZ',
    'THAILAND' : 'TH',
    'TIMOR-LESTE' : 'TL',
    'TOGO' : 'TG',
    'TOKELAU' : 'TK',
    'TONGA' : 'TO',
    'TRINIDAD AND TOBAGO' : 'TT',
    // 'TROMELIN ISLAND' : '*',
    'TUNISIA' : 'TN',
    'TURKEY' : 'TR',
    'TURKMENISTAN' : 'TM',
    'TURKS AND CAICOS ISLANDS' : 'TC',
    'TUVALU' : 'TV',
    'UGANDA' : 'UG',
    'UKRAINE' : 'UA',
    'UNITED ARAB EMIRATES' : 'AE',
    'UNITED KINGDOM' : 'GB',
    'UNITED STATES OF AMERICA' : 'US',
    'URUGUAY' : 'UY',
    'UZBEKISTAN' : 'UZ',
    'VANUATU' : 'VU',
    'VATICAN CITY' : 'VA',
    'VENEZUELA' : 'VE',
    'VIETNAM' : 'VN',
    'VIRGIN ISLANDS, BRITISH' : 'VG',
    'VIRGIN ISLANDS, UNITED STATES ' : 'VI',
    // 'WAKE ISLAND' : '*',
    'WALLIS AND FUTUNA' : 'WF',
    // 'WEST BANK' : '*',
    'WESTERN SAHARA' : 'EH',
    'YEMEN' : 'YE',
    'ZAMBIA' : 'ZM',
    'ZIMBABWE' : 'ZW'
  });

  const changeExtent = d3.extent(data3, d => parseFloat(d.commitment_amount_usd_constant));

  const amounts = (data3.map(d => parseFloat(d.commitment_amount_usd_constant))).sort((a, b) => a - b);

  const legendVals = [amounts[20], amounts[parseInt((amounts.length)/4)], amounts[parseInt((amounts.length)*3/4)], amounts[amounts.length-1]];

  console.log(amounts);
  const countries = data.map(d => countAbbr[d.Country.toUpperCase()]).sort();

  const rollbyPurposes = d3.rollup(data3,v => d3.sum(v, d => parseFloat(d.commitment_amount_usd_constant)),
                                     d => d.coalesced_purpose_name, d => countAbbr[d.recipient.toUpperCase()]);

  const vArr = Array.from(rollbyPurposes, ([purpose, country]) => { const zipCountryRec = Array.from(country, ([country, received]) => ({country, received})); return { purpose: purpose, country: zipCountryRec } });

  const zipPurpose = vArr;

  const purposes = (d3.map(data3, function(d){return d.coalesced_purpose_name;})).keys();

  const margin = ({top: 100, right: 15, bottom: 10, left: 95});

  const v3width = 1020;
  const v3height = 500;

  const visWidth = 600 - margin.left - margin.right;
  const visHeight = 400 - margin.top - margin.bottom;

  const svg = div.append('svg').attr("viewBox", [0, 0, v3width, v3height]);

  const g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

  g.append("text")
    .attr("x", visWidth-70)
    .attr("y", -margin.top)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "hanging")
    .attr("font-family", "sans-serif")
    .attr("font-size", "16px")
    .text("Purpose Distributions (Received)");

  const x = d3.scalePoint()
      .domain(countries)
      .range([0, 920])
      .padding(1);

  const y = d3.scalePoint()
      .domain(purposes)
      .range([0, visHeight])
      .padding(0.5);

  const maxRadius = 11;
  const radius = d3.scaleSqrt()
      .domain([0, d3.max(zipPurpose, d => d3.max(d.country, b => b.received))])
      .range([0, maxRadius]);


  const legend = g.append("g")
      .attr("transform", `translate(${v3width + margin.right - 200}, -110)`)
    .selectAll("g")
    .data(legendVals)
    .join("g")
      .attr("transform", (d, i) => `translate(0, ${i * 2.5 * maxRadius})`);

  legend.append("circle")
    .attr("r", d => radius(d))
    .attr("fill", "darkblue");

  legend.append("text")
    .attr("font-family", "sans-serif")
    .attr("font-size", 8)
    .attr("dominant-baseline", "middle")
    .attr("x", maxRadius + 5)
    .text(d => d);

  const xAxis = d3.axisBottom(x);

  g.append("g")
      .attr("transform", `translate(0, ${visHeight})`)
      .call(xAxis)
      .attr("font-size", 8)
      .call(g => g.selectAll(".domain").remove())
    .append("text")
      .attr("x", visWidth)
      .attr("y", 40)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .text("Countries");

  const yAxis = d3.axisLeft(y);

  g.append("g")
      .call(yAxis)
      .attr("font-size", 4.6)
      .call(g => g.selectAll(".domain").remove())
    .append("text")
      .attr("x", 15)
      .attr("y", 1)
      .attr("fill", "black")
      .attr("dominant-baseline", "middle")
      .text("Purposes");


  const rows = g.selectAll(".row")
    .data(zipPurpose)
    .join("g")
      .attr("transform", d => `translate(0, ${y(d.purpose)})`);

  rows.selectAll("circle")
    .data(d => d.country)
    .join("circle")
      .attr("cx", d => x(d.country))
      .attr("cy", d => 0)
      .attr("fill", "darkblue")
      .attr("r", d => radius(d.received));

}
