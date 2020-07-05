import pandas

aid2 = pandas.read_csv("/Users/Rutwik/Documents/NYU/IV/MiniP2/v1_1.csv")

# aid2 = aid2.sort_values(['net_committed'], ascending=[False])

sorter = ["India", "Thailand", "Brazil", "Colombia",  "Poland", "Korea", "South Africa", "Chile", "Kuwait", "Romania", "Taiwan", "Saudi Arabia", "Hungary","Czech Republic", "Cyprus", "Slovak Republic","Ireland","Qatar","Lithuania","Greece","Luxembourg","Latvia"
,"Estonia"
,"United Arab Emirates"
,"Slovenia"
,"New Zealand"
,"Australia"
,"Portugal"
,"Iceland"
,"Liechtenstein"
,"Monaco"
,"Austria"
,"Finland"
,"Italy"
,"Spain"
,"Belgium"
,"Denmark"
,"Switzerland"
,"Canada"
,"Norway"
,"Sweden"
,"Netherlands"
,"France"
,"United Kingdom"
,"Germany"
,"Japan"
,"United States"]

true_sort = [s for s in sorter if s in aid2.country.unique()]
df = aid2.set_index('country').loc[sorter].reset_index()

df.to_csv("v1.csv")

print(df)
