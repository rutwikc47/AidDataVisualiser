import pandas

aid = pandas.read_csv("/Users/Rutwik/Documents/NYU/IV/MiniP2/aiddata-countries.csv")

donor_data = aid.groupby(['donor'])['commitment_amount_usd_constant'].sum().sort_values(ascending=False).head(20)
receiver_data = aid.groupby(['recipient'])['commitment_amount_usd_constant'].sum().sort_values(ascending=False).head(20)

top_donors = donor_data[:20].index.tolist()
top_receivers = receiver_data[:10].index.tolist()

print(top_receivers)
print(top_donors)

filter_donor = aid.donor.isin(top_donors)
findonor = aid[filter_donor]

filter_recipient = findonor.recipient.isin(top_receivers)
finrecipient = findonor[filter_recipient]

finfin = finrecipient.groupby(['donor', 'recipient'])['commitment_amount_usd_constant'].sum()

finfin.columns = ['donor', 'recipient']

finfin.to_csv("v1mp3.csv", header = True)

