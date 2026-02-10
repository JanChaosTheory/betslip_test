"use client";

import { Fragment } from "react";
import { SelectionCell } from "./SelectionCell";
import type { MarketRowOption } from "../data/match";

const ROW_STYLE = {
  minHeight: "var(--market-row-min-h)",
};

type MarketRowGridHeaderProps =
  | {
      columnCount: 2;
      label: string;
      leftHeader: string;
      rightHeader: string;
    }
  | {
      columnCount: 3;
      label: string;
      headers: [string, string, string];
    };

export function MarketRowGridHeader(props: MarketRowGridHeaderProps) {
  if (props.columnCount === 2) {
    return (
      <Fragment>
        <div className="market-label-cell theme-transition text-xs font-medium text-muted-foreground">
          {props.label}
        </div>
        <div className="theme-transition flex min-w-0 items-center justify-center truncate text-xs font-medium text-muted-foreground">
          {props.leftHeader}
        </div>
        <div className="theme-transition flex min-w-0 items-center justify-center truncate text-xs font-medium text-muted-foreground">
          {props.rightHeader}
        </div>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <div className="market-label-cell theme-transition text-xs font-medium text-muted-foreground">
        {props.label}
      </div>
      {props.headers.map((h) => (
        <div
          key={h}
          className="theme-transition flex min-w-0 items-center justify-center truncate text-xs font-medium text-muted-foreground"
        >
          {h}
        </div>
      ))}
    </Fragment>
  );
}

type MarketRowGridRowProps = {
  variant: "label" | "numeric";
  labelOrValue: React.ReactNode;
  leftOption: MarketRowOption;
  rightOption: MarketRowOption;
  rowId: string;
  rowSelections: Record<string, string | null>;
  onRowSelect: (rowId: string, optionId: string | null) => void;
  thirdOption?: MarketRowOption;
};

export function MarketRowGridRow({
  variant,
  labelOrValue,
  leftOption,
  rightOption,
  rowId,
  rowSelections,
  onRowSelect,
  thirdOption,
}: MarketRowGridRowProps) {
  const selected = rowSelections[rowId];
  const handleToggle = (optionId: string) => {
    onRowSelect(rowId, selected === optionId ? null : optionId);
  };

  const labelCell = (
    <div
      className="market-label-cell theme-transition overflow-hidden text-sm text-muted-foreground"
      style={ROW_STYLE}
    >
      <span className="min-w-0 line-clamp-2 break-words">
        {labelOrValue}
      </span>
    </div>
  );

  const cell = (opt: MarketRowOption) => (
    <div key={opt.id} className="min-w-0" style={ROW_STYLE}>
      <SelectionCell
        option={opt}
        selected={selected === opt.id}
        onToggle={() => handleToggle(opt.id)}
      />
    </div>
  );

  if (thirdOption != null) {
    return (
      <Fragment>
        {labelCell}
        {cell(leftOption)}
        {cell(rightOption)}
        {cell(thirdOption)}
      </Fragment>
    );
  }

  return (
    <Fragment>
      {labelCell}
      {cell(leftOption)}
      {cell(rightOption)}
    </Fragment>
  );
}

