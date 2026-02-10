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
      noLabel?: boolean;
    }
  | {
      columnCount: 3;
      label: string;
      headers: [string, string, string];
    };

export function MarketRowGridHeader(props: MarketRowGridHeaderProps) {
  const headerCellClass =
    "theme-transition flex min-w-0 items-center justify-center truncate text-xs font-semibold text-muted-foreground";
  const headerLabelClass =
    "market-label-cell theme-transition text-xs font-medium text-muted-foreground";
  if (props.columnCount === 2) {
    if (props.noLabel) {
      return (
        <Fragment>
          <div className={headerCellClass}>{props.leftHeader}</div>
          <div className={headerCellClass}>{props.rightHeader}</div>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <div className={headerLabelClass}>{props.label}</div>
        <div className={headerCellClass}>{props.leftHeader}</div>
        <div className={headerCellClass}>{props.rightHeader}</div>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <div className={headerLabelClass}>{props.label}</div>
      {props.headers.map((h) => (
        <div key={h} className={headerCellClass}>
          {h}
        </div>
      ))}
    </Fragment>
  );
}

export type MarketRowLayout = "withLabel" | "noLabel";

type MarketRowGridRowProps = {
  layout: MarketRowLayout;
  variant: "label" | "numeric";
  labelOrValue: React.ReactNode;
  leftOption: MarketRowOption;
  rightOption: MarketRowOption;
  rowId: string;
  marketId: string;
  selectedIds: Set<string>;
  onRowSelect: (rowId: string, optionId: string) => void;
  thirdOption?: MarketRowOption;
  showRowSeparator?: boolean;
  isFirstRow?: boolean;
};

export function MarketRowGridRow({
  layout,
  variant,
  labelOrValue,
  leftOption,
  rightOption,
  rowId,
  marketId,
  selectedIds,
  onRowSelect,
  thirdOption,
  showRowSeparator = false,
  isFirstRow = true,
}: MarketRowGridRowProps) {
  const isSelected = (optionId: string) =>
    selectedIds.has(`${marketId}:${optionId}`);
  const handleClick = (optionId: string) => onRowSelect(rowId, optionId);
  const labelCell = (
    <div
      className="market-label-cell theme-transition overflow-hidden"
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
        selected={isSelected(opt.id)}
        onToggle={() => handleClick(opt.id)}
      />
    </div>
  );

  const firstCellNoLabel = (
    <div key={leftOption.id} className="min-w-0" style={ROW_STYLE}>
      <SelectionCell
        option={leftOption}
        selected={isSelected(leftOption.id)}
        onToggle={() => handleClick(leftOption.id)}
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

  if (layout === "noLabel") {
    return (
      <Fragment>
        {firstCellNoLabel}
        {cell(rightOption)}
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

