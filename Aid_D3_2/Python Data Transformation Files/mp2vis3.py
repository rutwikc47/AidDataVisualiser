import pandas

aid = pandas.read_csv("/Users/Rutwik/Documents/NYU/IV/MiniP2/aiddata-countries.csv")

timeR = [[1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983], [1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993], [1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003], [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013]]

for r in range(len(timeR)):

    r1data = aid.year.isin(timeR[r])
    finr1 = aid[r1data]

    receiver_data = finr1.groupby('recipient')['commitment_amount_usd_constant'].sum()

    df = receiver_data.reset_index()
    df.rename(columns={0:'Country', 1: 'net_committed'}, inplace=True)
    df.to_csv("v3"+str(r)+".csv")