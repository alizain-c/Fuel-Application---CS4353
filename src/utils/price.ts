class Price {
  private _gallonsRequested: number;
  private _state: string;

  private _pricePerGallon = 1.5;
  private _locationFactor = 0.04;
  private _rateHistoryFactor = 0.01;
  private _gallonsRequestedFactor = 0.03;
  private _companyProfitFactor = 0.1;

  private _margin = 0;
  private _suggestedPrice = 0;
  private _total = 0;

  constructor(gallons: number, state: string, history: boolean) {
    this._gallonsRequested = gallons;
    this._state = state;

    this._calculateLocationFactor();
    this._calculateRateHistoryFactor(history);
    this._calculateGallonsRequestedFactor();
    this._calculateMargin();
    this._calculateSuggestedPrice();
  }

  private _calculateLocationFactor(): void {
    if (this._state === "TX") {
      this._locationFactor = 0.02;
      return;
    }

    this._locationFactor = 0.04;
  }

  private _calculateRateHistoryFactor(history: boolean): void {
    if (history) {
      this._rateHistoryFactor = 0.01;
      return;
    }

    this._rateHistoryFactor = 0;
  }

  private _calculateGallonsRequestedFactor(): void {
    if (this._gallonsRequested > 1000) {
      this._gallonsRequestedFactor = 0.02;
      return;
    }

    this._gallonsRequestedFactor = 0.03;
  }

  private _calculateMargin(): void {
    this._margin =
      this._pricePerGallon *
      (this._locationFactor -
        this._rateHistoryFactor +
        this._gallonsRequestedFactor +
        this._companyProfitFactor);
  }

  private _calculateSuggestedPrice(): void {
    this._suggestedPrice = this._pricePerGallon + this._margin;
  }

  public get suggestedPrice(): number {
    return this._suggestedPrice;
  }

  public calculatePrice(): number {
    this._total = this._suggestedPrice * this._gallonsRequested;

    return this._total;
  }
}

export default Price;
