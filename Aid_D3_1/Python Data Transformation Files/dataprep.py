import pandas

aid = pandas.read_csv("/Users/Rutwik/Documents/NYU/IV/MiniP1/rrc370_Mini_Project_1/aiddata-countries.csv")

donor_data = aid.groupby('donor')['commitment_amount_usd_constant'].sum()

receiver_data = aid.groupby('recipient')['commitment_amount_usd_constant'].sum()

df = pandas.concat([donor_data, receiver_data], axis=1)

df.columns = ["donated", "received"]

df.fillna(0, inplace=True)

df['net_committed'] = df['donated'] - df['received']

df.index.rename('Country', inplace=True)

df.to_csv("scores.csv")

print(df)
