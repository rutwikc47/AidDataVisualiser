import pandas

aid = pandas.read_csv("/Users/Rutwik/Documents/NYU/IV/MiniP2/aiddata-countries.csv")

donor_data = aid.groupby(['donor','year'])['commitment_amount_usd_constant'].sum()
receiver_data = aid.groupby(['recipient', 'year'])['commitment_amount_usd_constant'].sum()

df = pandas.concat([donor_data, receiver_data], axis=1)

df.columns = ["donated", "received"]

df.fillna(0, inplace=True)

df['net_committed'] = df['donated'] - df['received']

df.to_csv("v1_1.csv")

