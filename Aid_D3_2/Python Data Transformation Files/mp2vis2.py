import pandas

aid = pandas.read_csv("/Users/Rutwik/Documents/NYU/IV/MiniP2/aiddata-countries.csv")

aid = aid[aid.coalesced_purpose_name != "Sectors not specified"]

dPurpose = aid.groupby(['coalesced_purpose_name'])['commitment_amount_usd_constant'].sum()

dPurpose = (dPurpose.to_frame().sort_values(by=['commitment_amount_usd_constant'], ascending=False))

doom = dPurpose[:10].index.tolist()

ddata = aid['coalesced_purpose_name'].isin(doom)

findf = aid[ddata]

dffin = findf[['year','coalesced_purpose_name','recipient', 'commitment_amount_usd_constant']]

sum_df = dffin.groupby(['year','coalesced_purpose_name']).agg({'commitment_amount_usd_constant': 'sum'})

# print(sum_df)
sum_df.to_csv("v2.csv")



