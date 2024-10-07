import random, string

class Random:
    
    def __init__(self, min_length:int, max_length:int):
        self.min_length = min_length
        self.max_length = max_length

    def string(self) -> str:
        length = random.randint(
            self.min_length, self.max_length
        )
        
        return ''.join(
            random.choices(
                string.ascii_letters + string.digits, k=length
            )
        )