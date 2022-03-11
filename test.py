'''This is the documenation for the test.py file.
https://github.com/solidlyexchange/solidly/issues/49
'''
class Minter:
    def __init__(self, user_locked_ratio = 0.5):
        self.total_supply = 100
        self.protocol_controlled_supply = 20
        self.locked_supply = 20
        self.reserve = 80
        self.week = 0
        self.weekly = 20
        self.user_locked_ratio = user_locked_ratio
    
    @property
    def circulating_supply(self):
        return self.total_supply - self.locked_supply
    
    @property
    def calculate_emission(self):
        return self.weekly * 0.98 * self.circulating_supply / self.total_supply
    
    @property
    def circulating_emission(self):
        return self.circulating_supply * 0.002
    
    @property
    def weekly_emission(self):
        return max(self.calculate_emission, self.circulating_emission)
    
    def calculate_growth(self, minted):
        return self.locked_supply * minted / self.total_supply
    
    def info(self):
        print(f"circulating_supply: {self.circulating_supply} ({self.circulating_supply / self.total_supply})")
        print(f"locked_supply: {self.locked_supply} ({self.locked_supply / self.total_supply})")
        print(f"reserve: {self.reserve}")
        circulating_supply_excluding_reserve = self.circulating_supply - self.reserve
        print(f"circulating supply excluding minter reserve: {circulating_supply_excluding_reserve} ({circulating_supply_excluding_reserve / self.total_supply})")
        print(f"protocol controlled supply: {self.protocol_controlled_supply} ({self.protocol_controlled_supply / self.total_supply})")
        print(f"total supply: {self.total_supply}")
    
    def next_week(self):
        self.week += 1
        print(f"week {self.week}")
        weekly = self.weekly_emission
        print(f"is tail emission: {weekly == self.circulating_emission}")
        self.weekly = weekly
        growth = self.calculate_growth(weekly)
        distribute = weekly + growth
        print(f"weekly emission: {weekly} ({weekly / distribute})")
        print(f"ve growth: {growth} ({growth / distribute})")
        if distribute > self.reserve:
            print(f"mint {distribute - self.reserve}")
            self.reserve = 0
            self.total_supply += distribute - self.reserve
        else:
            print(f"distribute {distribute} from reserve.")
            self.reserve -= distribute
        self.protocol_controlled_supply += growth
        self.locked_supply += growth + self.user_locked_ratio * weekly
        self.info()

m = Minter(0.5)
for i in range(300):
    m.next_week()